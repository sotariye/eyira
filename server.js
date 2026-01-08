
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { Resend } from 'resend';

dotenv.config({ path: '.env.local' });

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️  STRIPE_SECRET_KEY is missing in .env.local. Checkout will fail.');
}
const stripe = new Stripe(stripeKey);
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const DOMAIN = 'http://localhost:3001';

app.post('/api/checkout', async (req, res) => {
    try {
        console.log('📦 Checkout Request Body:', req.body); // DEBUG
        const { items, deliveryMethod } = req.body;
        console.log('🚚 Delivery Method:', deliveryMethod); // DEBUG

        const lineItems = items.map((item) => {
            return {
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: `Eyira - ${item.name}`,
                        description: item.size,
                        images: DOMAIN.includes('localhost')
                            ? ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80']
                            : [`${DOMAIN}${item.image}`],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });

        const sessionConfig = {
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            allow_promotion_codes: true, // Enable coupon codes
            metadata: {
                delivery_type: deliveryMethod,
                delivery_method: deliveryMethod
            },
            success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/`,
        };

        if (deliveryMethod === 'pickup') {
            sessionConfig.phone_number_collection = { enabled: true };
            sessionConfig.custom_text = {
                submit: { message: 'You are placing a PICKUP order for our Ottawa Kitchen.' },
            };
        } else {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingOptions = [{
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 1500, currency: 'cad' },
                    display_name: 'Standard Shipping',
                    delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 5 } },
                },
            }];
            if (subtotal >= 75) {
                shippingOptions.push({
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 0, currency: 'cad' },
                        display_name: 'Free Shipping',
                        delivery_estimate: { minimum: { unit: 'business_day', value: 5 }, maximum: { unit: 'business_day', value: 7 } },
                    },
                });
            }
            sessionConfig.shipping_address_collection = { allowed_countries: ['CA', 'US'] };
            sessionConfig.shipping_options = shippingOptions;
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// LOCAL WEBHOOK TEST ENDPOINT
app.post('/api/webhook', async (req, res) => {
    // In local test, we bypass signature verification
    const event = req.body;
    console.log(`🔔 Local Webhook received event: ${event.type}`);

    const session = event.data?.object;
    const customerEmail = session?.customer_details?.email;
    const customerName = session?.customer_details?.name || 'there';
    // Robust check for delivery method
    const deliveryMethod = session?.metadata?.delivery_method || session?.metadata?.delivery_type;

    if (event.type === 'checkout.session.completed') {
        console.log(`✅ Order Confirmed for ${customerEmail} (Method: ${deliveryMethod})`);

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
            console.log('✅ Email sent via Resend!');
        } catch (e) {
            console.error('❌ Resend Error:', e);
        }
    }

    res.json({ received: true });
});

const PORT = 4242;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
