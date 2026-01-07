// api/webhook.js
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
    api: {
        bodyParser: false, // Disabling body parser to verify Stripe signature
    },
};

// Helper to read raw body
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
            // 1. Verify that the request actually came from Stripe
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // 2. Handle the event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log('✅ Payment successful for session:', session.id);

            // Extract details
            const customerEmail = session.customer_details?.email;
            const deliveryMethod = session.metadata?.delivery_method; // 'pickup' or undefined
            const emailSubject = deliveryMethod === 'pickup' ? 'Ready for Pickup! 🥡' : 'Order Confirmed 📦';

            console.log(`📧 Sending email to ${customerEmail}. Subject: ${emailSubject}`);

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
                console.log('✅ Email sent successfully');
            } catch (emailError) {
                console.error('❌ Error sending email:', emailError);
            }
        }

        res.status(200).json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
