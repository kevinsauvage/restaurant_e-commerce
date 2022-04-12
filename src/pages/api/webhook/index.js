import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      // eslint-disable-next-line no-unused-vars
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      /*      // Handle event type (add business logic here)
      if (event.type === 'checkout.session.completed') {
        console.log(`💰  Payment received!`);
      } else {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      }
 */
      res.json({ received: true });
    } catch (err) {
      res.status(400).json({ message: `Webhook Error: ${err.message}` });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
  }
}
