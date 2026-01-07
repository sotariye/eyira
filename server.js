
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

dotenv.config({ path: '.env.local' });

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️  STRIPE_SECRET_KEY is missing in .env.local. Checkout will fail.');
}
const stripe = new Stripe(stripeKey);
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const DOMAIN = 'http://localhost:3001';

app.post('/api/checkout', async (req, res) => {
    try {
        const { items, deliveryMethod } = req.body;

        // Map cart items to Stripe line items
        const lineItems = items.map((item) => {
            return {
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: `Eyira - ${item.name}`,
                        description: item.size,
                        // Stripe requires a public URL. 'localhost' won't work.
                        // Using a placeholder for dev. In prod, use real domain.
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
            success_url: `${DOMAIN}/#/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/#/`,
            // automatic_tax: { enabled: true }, // Uncomment when ready
        };

        if (deliveryMethod === 'pickup') {
            // PICKUP MODE: No Shipping Address Required
            sessionConfig.metadata = { delivery_method: 'pickup' };
            // Optional: collect phone number for pickup coordination
            sessionConfig.phone_number_collection = { enabled: true };

            // Add visual reminder on checkout page
            sessionConfig.custom_text = {
                submit: {
                    message: 'You are placing a PICKUP order for our Ottawa Kitchen.',
                },
            };
        } else {
            // SHIPPING MODE (Default)
            // Calculate subtotal for free shipping logic
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            const shippingOptions = [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 1500, currency: 'cad' },
                        display_name: 'Standard Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 3 },
                            maximum: { unit: 'business_day', value: 5 },
                        },
                    },
                }
            ];

            if (subtotal >= 75) {
                shippingOptions.push({
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 0, currency: 'cad' },
                        display_name: 'Free Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 },
                        },
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

const PORT = 4242;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
