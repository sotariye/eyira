
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const DOMAIN = process.env.VITE_PUBLIC_DOMAIN || 'http://localhost:3001';

export default async function handler(req, res) {
    if (req.method === 'POST') {
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
                            images: [`${DOMAIN}${item.image}`],
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
                // Explicitly adding delivery type to metadata for all orders
                metadata: {
                    delivery_type: deliveryMethod, // 'pickup' or 'ship'
                    delivery_method: deliveryMethod // legacy/redundant but good for safety
                },
                success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${DOMAIN}/`,
            };

            if (deliveryMethod === 'pickup') {
                // PICKUP MODE
                sessionConfig.phone_number_collection = { enabled: true };
                // Add visual reminder
                sessionConfig.custom_text = {
                    submit: {
                        message: 'You are placing a PICKUP order for our Ottawa Kitchen.',
                    },
                };
            } else {
                // SHIPPING MODE
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

            res.status(200).json({ url: session.url });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creating checkout session' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
