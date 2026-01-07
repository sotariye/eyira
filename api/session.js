
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing session ID' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(id);
        res.status(200).json({
            customer_details: session.customer_details,
            metadata: session.metadata
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
