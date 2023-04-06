import Stripe from 'stripe';

import withAuth from '../../middleware/withAuth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (request, response) => {
  const { id } = request.query;

  try {
    if (!id.startsWith('cs_')) {
      throw new Error('Incorrect CheckoutSession ID.');
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(id);
    const items = await stripe.checkout.sessions.listLineItems(id, {
      limit: 100,
    });

    response.status(200).json({ items, session: checkoutSession });
  } catch (error) {
    response.status(500).json({ message: error.message, statusCode: 500 });
  }
};

export default withAuth(handler);
