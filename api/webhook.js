import { Buffer } from 'buffer';
import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.RESEND_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error(`❌ Webhook Error: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        const session = event.data.object;
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name || 'there';

        // Critical: Check delivery method (Pickup vs Ship)
        const deliveryMethod = session.metadata?.delivery_method;

        switch (event.type) {
            case 'checkout.session.completed':
                console.log(`✅ Order Confirmed for ${customerEmail} (Method: ${deliveryMethod})`);

                await resend.emails.send({
                    from: 'Eyira Foods <support@eyira.shop>',
                    to: customerEmail,
                    subject: deliveryMethod === 'pickup' ? 'Ready for Pickup! 🥡' : 'Your Order is Confirmed 📦',
                    html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="font-family: serif; font-weight: normal; font-size: 24px; margin-bottom: 20px;">Thanks for your order, ${customerName}!</h1>
              <p>We have received your payment and are getting your Jollof Base ready.</p>
              
              ${deliveryMethod === 'pickup'
                            ? `<div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                     <strong>🥡 Local Pickup Instructions</strong><br/><br/>
                     Pickup Location: <strong>Ottawa Kitchen</strong><br/>
                     Address: 123 Example St, Ottawa, ON K1P 5J2<br/><br/>
                     We will email you again when it is ready for collection.
                   </div>`
                            : `<p>We will notify you when your order has shipped.</p>`}
              
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="font-size: 12px; color: #888;">Questions? Reply to this email or contact support@eyira.shop.</p>
            </div>
          `
                });
                break;

            case 'checkout.session.expired':
                if (customerEmail) {
                    console.log(`🛒 Abandoned Cart email for ${customerEmail}`);
                    await resend.emails.send({
                        from: 'Eyira Foods <support@eyira.shop>',
                        to: customerEmail,
                        subject: 'Did you forget your Jollof? 🌶️',
                        html: `
                <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="font-family: serif;">Still hungry, ${customerName}?</h2>
                    <p>It looks like you left some Instant Jollof Sauce in your cart.</p>
                    <p><a href="https://eyira.shop" style="color: black; text-decoration: underline;">Return to checkout</a></p>
                </div>
            `
                    });
                }
                break;

            default:
                console.log(`ℹ️ Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
