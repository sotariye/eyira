
// api/webhook.js
import Stripe from 'stripe';
// import { Resend } from 'resend'; // Uncomment after installing: pnpm add resend

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const resend = new Resend(process.env.RESEND_API_KEY);

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

            console.log(`📧 Preparing to send email to ${customerEmail}. Method: ${deliveryMethod || 'shipping'}`);

            /* 
            // ---------------------------------------------------------
            // OPTION 2: SEND CUSTOM EMAIL VIA RESEND
            // ---------------------------------------------------------
            try {
              await resend.emails.send({
                from: 'Eyira <orders@eyira.shop>',
                to: customerEmail,
                subject: deliveryMethod === 'pickup' ? 'Ready for Pickup! 🥡' : 'Order Confirmed 📦',
                html: `
                  <h1>Thank you for your order!</h1>
                  <p>We have received your payment.</p>
                  ${deliveryMethod === 'pickup' 
                    ? '<p><strong>Pickup Location:</strong><br/>Ottawa Kitchen<br/>(Address here)</p>' 
                    : '<p>We will notify you when your order ships.</p>'}
                `
              });
            } catch (emailError) {
              console.error('Error sending email:', emailError);
            }
            */
        }

        res.status(200).json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
