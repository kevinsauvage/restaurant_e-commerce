import Stripe from 'stripe';

import withAuth from '../../middleware/withAuth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (request, response) => {
  if (request.method === 'POST') {
    try {
      const { items, user } = request.body;
      const { origin } = request.headers;

      if (!Array.isArray(items)) return response.status(404).json({ message: 'Missing items' });

      const stripeItems = items.map((item) => {
        const formatedPrice = item.product.price.replace(',', '.').trim();
        const price = formatedPrice * 100;

        return {
          price_data: {
            currency: 'EUR',
            product_data: {
              description: item.product.description,
              name: item.product.name,
            },
            unit_amount_decimal: price.toFixed(0),
          },
          quantity: item.quantity,
        };
      });

      const stipeObject = {
        cancel_url: `${origin}/confirmation?success=false`,
        client_reference_id: user.id,
        customer_email: user.email,
        line_items: stripeItems ?? [],
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      };

      const session = await stripe.checkout.sessions.create(stipeObject);

      response.status(200).json(session);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ message: 'Method not allowed' });
  }
};

export default withAuth(handler);
