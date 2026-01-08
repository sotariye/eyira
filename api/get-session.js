
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        if (!id || !id.startsWith('cs_')) {
            // Return default instead of error to prevent UI crash loops
            return res.status(200).json({ customer_name: 'Customer', delivery_type: 'shipping' });
        }

        const session = await stripe.checkout.sessions.retrieve(id, {
            expand: ['line_items', 'customer_details']
        });

        // SAFETY: Use optional chaining (?.) and default values everywhere.
        // We map 'delivery_method' (from checkout) to 'delivery_type' (for frontend).
        const method = session?.metadata?.delivery_method || session?.metadata?.delivery_type || 'shipping';

        return res.status(200).json({
            customer_name: session?.customer_details?.name || session?.shipping_details?.name || 'Jollof Lover',
            delivery_type: method,
            status: session?.payment_status || 'complete'
        });
    } catch (err) {
        console.error('STRICT ERROR:', err.message);
        // Even if it fails, return a basic object so the UI doesn't loop/glitch
        return res.status(200).json({
            customer_name: 'Customer',
            delivery_type: 'shipping'
        });
    }
}
