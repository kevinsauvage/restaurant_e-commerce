import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;
      const { origin } = req.headers;

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: items ?? [],
        success_url: `${origin}/confirmation?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/confirmation?success=false`,
      });

      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
  }
}
