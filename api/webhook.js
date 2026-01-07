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

        // Consistent metadata key: delivery_method (set in api/checkout.js)
        const deliveryMethod = session.metadata?.delivery_method;

        switch (event.type) {
            case 'checkout.session.completed':
                console.log(`✅ Order Confirmed for ${customerEmail} (Method: ${deliveryMethod})`);

                const emailContent = deliveryMethod === 'pickup' ? {
                    subject: 'Order Confirmed: We’re prepping your Jollof! 🥣',
                    headline: `We've received your order, ${customerName}!`,
                    body: `We are currently prepping your <strong>Instant Jollof Sauce</strong> at our Ottawa kitchen.`,
                    instructions: `
            <div style="background-color: #fdfcf0; padding: 20px; border: 1px solid #f1ebd4; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold; color: #8B0000;">📍 Pickup Location: Ottawa (Boyd Ave Area)</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                <strong>Wait for the Next Email:</strong> To ensure your Jollof is fresh and ready, please wait for our "Ready for Collection" email which will contain the <strong>exact address and pickup window</strong>.
              </p>
            </div>`
                } : {
                    subject: 'Order Confirmed: Your Jollof is on the way! 🌶️',
                    headline: `Your Jollof order is confirmed, ${customerName}!`,
                    body: `We’ve received your payment and are getting your <strong>Instant Jollof Sauce</strong> ready for shipment. You will receive another email with a tracking number as soon as it leaves our kitchen.`,
                    instructions: ''
                };

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
