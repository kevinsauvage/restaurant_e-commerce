import publicUser from '../../../helpers/publicUser';
import connectToDatabase from '../../../utils/mongo';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'PUT') {
    const { db } = await connectToDatabase();

    try {
      const { updatedFields, email } = req.body;

      if (!email) return res.status(400).json({ message: 'missing field' });

      const response = await db
        .collection('users')
        .updateOne({ email }, { $set: updatedFields });

      if (response.acknowledged) {
        const user = await db.collection('users').findOne({ email });
        return res.status(200).json({ success: true, user: publicUser(user) });
      }

      return res.status(400).end();
    } catch (error) {
      return res.status(400).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
