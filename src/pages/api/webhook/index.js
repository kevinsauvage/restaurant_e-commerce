/* eslint-disable camelcase */
import Stripe from 'stripe';
import { buffer } from 'micro';
import connectToDatabase from '../../../utils/mongo';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};
const webhook_secret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      const buf = await buffer(req);
      const sig = req.headers['stripe-signature'];

      // eslint-disable-next-line no-unused-vars
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhook_secret
      );

      if (event.type === 'checkout.session.completed') {
        console.log('receive event', event.type);
        const { id, client_reference_id, amount_subtotal, payment_status } =
          event.data.object;

        const items = await stripe.checkout.sessions.listLineItems(id, {
          limit: 100,
        });

        console.log('Items :', items);

        const { db } = await connectToDatabase();

        const userCollection = await db.collection('users');

        const user = await userCollection.findOne({ _id: client_reference_id });

        console.log('user db:', user);

        const newOrder = {
          items,
          totalPrice: amount_subtotal,
          created: event.created,
          payment_status,
        };

        const userOrders = user.orders;

        const newOrders =
          userOrders && Array.isArray(userOrders)
            ? [...userOrders, newOrder]
            : [newOrder];

        console.log('new orders :', newOrders);

        console.log('updating user');

        const response = await userCollection.updateOne(
          { _id: id },
          { $set: { orders: newOrders } }
        );
        console.log('res update user :', response);
      }

      res.json({ received: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: `Webhook Error: ${err.message}` });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
  }
}
