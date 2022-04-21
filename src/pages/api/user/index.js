import publicUser from '../../../helpers/publicUser';
import connectToDatabase from '../../../utils/mongo';
import withAuth from '../../middleware/withAuth';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    try {
      const { email } = req.query;

      if (!email) return res.status(400).json({ message: 'missing field' });

      const { db } = await connectToDatabase();

      const user = await db.collection('users').findOne({ email });

      return res.status(200).json({ success: true, user: publicUser(user) });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
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
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);
