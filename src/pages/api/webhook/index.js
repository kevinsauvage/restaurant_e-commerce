/* eslint-disable camelcase */
import { buffer } from 'micro';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';

import connectToDatabase from '../../../utils/mongo';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};
const webhook_secret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(request, response) {
  if (request.method === 'POST') {
    let event;

    try {
      const buf = await buffer(request);
      const sig = request.headers['stripe-signature'];

      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhook_secret);

      if (event.type === 'checkout.session.completed') {
        const { id, client_reference_id, amount_subtotal, payment_status } = event.data.object;

        const items = await stripe.checkout.sessions.listLineItems(id, {
          limit: 100,
        });

        const { db } = await connectToDatabase();

        const userCollection = await db.collection('users');

        const userObjectId = ObjectId(client_reference_id);

        const user = await userCollection.findOne({
          _id: userObjectId,
        });

        const newOrder = {
          created: event.created,
          items: items.data,
          payment_status,
          totalPrice: amount_subtotal,
        };

        const userOrders = user?.orders;

        const newOrders =
          userOrders && Array.isArray(userOrders) ? [...userOrders, newOrder] : [newOrder];

        await userCollection.updateOne({ _id: userObjectId }, { $set: { orders: newOrders } });
      }

      response.json({ received: true });
    } catch (error) {
      response.status(400).json({ message: `Webhook Error: ${error.message}` });
    }
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ message: 'Method not allowed' });
  }
}
