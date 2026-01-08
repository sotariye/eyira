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
    const customerName = session.customer_details?.name || session.shipping_details?.name || 'Jollof Lover';

    console.log(`✅ Processing Order: ${session.id} for ${customerEmail}`);

    try {
        await resend.emails.send({
            from: 'Eyira Foods <support@eyira.shop>',
            to: customerEmail,
            subject: 'Order Confirmed: Your Jollof Sauce is being prepped! 🌶️',
            html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 12px;">
                <h1 style="color: #8B0000; margin-top: 0;">Thanks for your order, ${customerName}!</h1>
                <p style="font-size: 16px; line-height: 1.5; color: #444;">
                  We’ve received your payment and our kitchen is officially in Jollof-mode. 
                  Whether you're picking up or waiting for a delivery, we've got you covered.
                </p>
                
                <div style="background-color: #fdfcf0; padding: 20px; border: 1px solid #f1ebd4; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold; color: #8B0000;">What Happens Next?</p>
                  <ul style="padding-left: 20px; color: #444;">
                    <li><strong>Shipping:</strong> You'll get a tracking number once your jar leaves the kitchen.</li>
                    <li><strong>Pickup:</strong> Watch your inbox for a "Ready for Collection" email with our Ottawa address (Boyd Ave) and pickup times.</li>
                  </ul>
                </div>

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  Questions? Just reply to this email or contact <strong>support@eyira.shop</strong>.
                </p>
                <p style="font-weight: bold; color: #8B0000;">Stay spicy,<br/>The Eyira Team</p>
            </div>
            `
        });
        console.log('✅ Email sent via Resend.');
        processedSessions.add(session.id);
    } catch (e) {
        console.error('❌ Resend Error (Check Resend Dashboard):', e);
    }
}

export default async function handler(req, res) {
    // 1. Check if the method is POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    // 2. Your existing Stripe Webhook logic starts here...
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    console.log('🔔 Webhook received. Signature present:', !!sig);

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log('✅ Signature Verified. Event Type:', event.type);
    } catch (err) {
        console.error(`❌ Webhook Signature Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const session = event.data.object;
    console.log('Processing session:', session?.id);

    switch (event.type) {
        case 'checkout.session.completed':
            const customerEmail = session.customer_details?.email;

            // 1. Better Name Handling
            const rawName = session.customer_details?.name || session.shipping_details?.name;
            const firstName = rawName ? rawName.split(' ')[0] : 'Jollof Lover';

            // 2. Identify Delivery Type (Matches your Stripe Metadata)
            const isPickup = session.metadata?.delivery_type === 'pickup';

            // 3. Conditional Content
            const emailSubject = 'Eyira - Order Confirmed!';

            const deliveryMessage = isPickup
                ? `We are prepping your order for <strong>pickup at our Ottawa Kitchen</strong>. Watch your inbox for the exact Boyd Ave address once it's ready!`
                : `Your Jollof is being packed! We'll email you a tracking number shortly once it leaves the kitchen.`;

            await resend.emails.send({
                from: 'Eyira Foods <support@eyira.shop>',
                to: customerEmail,
                subject: emailSubject,
                html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                <h1 style="color: #8B0000;">Thanks for your order, ${firstName}!</h1>
                <p style="font-size: 16px; line-height: 1.5;">${deliveryMessage}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 14px; color: #666;">Order ID: ${session.id.slice(-8).toUpperCase()}</p>
              </div>
            `
            });
            break;

        case 'checkout.session.expired': {
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
        }

        default:
            console.log(`ℹ️ Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}
