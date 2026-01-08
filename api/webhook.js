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

// Check for duplicate events (Note: In serverless, this only persists per instance)
const processedSessions = new Set();

async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

// Logic to send proper email based on order type
async function fulfillCheckout(session) {
    if (processedSessions.has(session.id)) {
        console.log(`ℹ️ Session ${session.id} already processed.`);
        return;
    }

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'there';
    // Consistent metadata key
    const deliveryMethod = session.metadata?.delivery_method;

    console.log(`✅ Processing Order: ${session.id} for ${customerEmail} (Method: ${deliveryMethod})`);

    // Generic Email for ALL orders (Pickup & Shipping)
    const emailContent = {
        subject: 'Eyira | Thank you for your purchase!',
        headline: `We've received your order, ${customerName}!`,
        body: `We are currently getting your <strong>Instant Jollof Sauce</strong> ready in our kitchen.`,
        instructions: `
            <div style="background-color: #fdfcf0; padding: 20px; border: 1px solid #f1ebd4; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                <strong>What happens next?</strong><br/>
                We will email you again as soon as your order has been shipped or is ready for pickup.
                </p>
            </div>`
    };

    try {
        await resend.emails.send({
            from: 'Eyira Foods <support@eyira.shop>',
            to: customerEmail,
            subject: emailContent.subject,
            html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 12px;">
                <h1 style="color: #8B0000; margin-top: 0; font-family: serif;">${emailContent.headline}</h1>
                <p style="font-size: 16px; line-height: 1.5; color: #444;">${emailContent.body}</p>
                
                ${emailContent.instructions}

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                Questions? Just reply to this email or contact support@eyira.shop.
                </p>
                <p style="font-weight: bold; color: #8B0000;">Stay spicy,<br/>The Eyira Team</p>
            </div>
            `
        });
        console.log('✅ Email sent via Resend.');
        processedSessions.add(session.id);
    } catch (e) {
        console.error('❌ Resend Error (Check Resend Dashboard):', e);
        // Throwing error allows Stripe to retry webhooks if it was a temporary failure
        // throw e; 
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        console.log('🔔 Webhook received. Signature present:', !!sig);

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
            console.log('✅ Signature Verified. Event Type:', event.type);
        } catch (err) {
            console.error(`❌ Webhook Signature Error: ${err.message}`);
            // Return 400 but log it clearly
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        const session = event.data.object;
        console.log('Processing session:', session?.id);

        switch (event.type) {
            case 'checkout.session.completed':
                await fulfillCheckout(session);
                break;

            case 'checkout.session.expired':
                const customerEmail = session.customer_details?.email;
                if (customerEmail) {
                    try {
                        await resend.emails.send({
                            from: 'Eyira Foods <support@eyira.shop>',
                            to: customerEmail,
                            subject: 'Did you forget your Jollof? 🌶️',
                            html: `
                  <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                      <h2 style="font-family: serif;">Still hungry?</h2>
                      <p>It looks like you left some Instant Jollof Sauce in your cart.</p>
                      <p><a href="https://eyira.shop" style="color: black; text-decoration: underline;">Return to checkout</a></p>
                  </div>
              `
                        });
                        console.log('✅ Abandoned Cart Email sent.');
                    } catch (e) { console.error(e); }
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
