
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { id } = req.query;

    // Validate the Session ID format
    if (!id || !id.startsWith('cs_')) {
        return res.status(400).json({ error: 'Invalid Session ID' });
    }

    try {
        // Retrieve session with expanded details
        const session = await stripe.checkout.sessions.retrieve(id, {
            expand: ['line_items', 'customer_details'],
        });

        // Return only necessary, safe data
        // Note: session.metadata.delivery_method matches what we set in checkout
        res.status(200).json({
            customer_name: session.customer_details?.name,
            delivery_type: session.metadata?.delivery_method,
            amount_total: session.amount_total,
            line_items: session.line_items.data,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
