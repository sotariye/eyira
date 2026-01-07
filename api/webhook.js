
// api/webhook.js
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
    api: {
        bodyParser: false,
    },
};

async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

// Handler for Order Confirmation
async function handleOrderConfirmation(session) {
    const customerEmail = session.customer_details?.email;
    const deliveryMethod = session.metadata?.delivery_method;
    const emailSubject = deliveryMethod === 'pickup' ? 'Ready for Pickup! 🥡' : 'Order Confirmed 📦';

    console.log(`📧 Sending confirmation email to ${customerEmail}.`);

    try {
        await resend.emails.send({
            from: 'Eyira Foods <support@eyira.shop>',
            to: customerEmail,
            subject: emailSubject,
            html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="font-family: serif; font-weight: normal; font-size: 24px; margin-bottom: 20px;">Thank you for your order.</h1>
          <p>We have received your payment and are getting your order ready.</p>
          
          ${deliveryMethod === 'pickup'
                    ? `<div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                 <strong>🥡 Local Pickup Instructions</strong><br/><br/>
                 Pickup Location: <strong>Ottawa Kitchen</strong><br/>
                 Address: (Add Address Here)<br/><br/>
                 We will email you again when it is ready for collection.
               </div>`
                    : `<p>We will notify you when your order has shipped.</p>`}
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">Questions? Reply to this email or contact support@eyira.shop.</p>
        </div>
      `
        });
        console.log('✅ Confirmation email sent.');
    } catch (error) {
        console.error('❌ Error sending confirmation email:', error);
    }
}

// Handler for Abandoned Cart (Session Expired)
async function handleAbandonedCart(session) {
    const customerEmail = session.customer_details?.email;

    // Only send if we actually captured an email effectively (Stripe sometimes doesn't have it on expiry if not filled)
    if (!customerEmail) {
        console.log('❌ No email found for abandoned cart session.');
        return;
    }

    console.log(`📧 Sending abandoned cart email to ${customerEmail}.`);

    try {
        await resend.emails.send({
            from: 'Eyira Foods <support@eyira.shop>',
            to: customerEmail,
            subject: 'Did you forget something? 🍚',
            html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="font-family: serif; font-weight: normal; font-size: 24px; margin-bottom: 20px;">Still hungry?</h1>
              <p>It looks like you left some Jollof Base in your cart.</p>
              <p><a href="https://eyira.shop" style="color: black; text-decoration: underline;">Return to checkout</a> to secure your jar before they run out.</p>
            </div>
            `
        });
        console.log('✅ Abandoned cart email sent.');
    } catch (error) {
        console.error('❌ Error sending abandoned cart email:', error);
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        const session = event.data.object;

        switch (event.type) {
            case 'checkout.session.completed':
                await handleOrderConfirmation(session);
                break;

            case 'checkout.session.expired':
                // Note: This relies on Stripe having captured the email before the session expired
                await handleAbandonedCart(session);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
