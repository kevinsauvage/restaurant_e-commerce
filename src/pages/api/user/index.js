import publicUser from '../../../helpers/publicUser';
import connectToDatabase from '../../../utils/mongo';
import withAuth from '../../middleware/withAuth';

const handler = async (request, response) => {
  const { method, query, body } = request;

  if (method === 'GET') {
    try {
      const { email } = query;

      if (!email) {
        return response.status(400).json({ message: 'missing field' });
      }

      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email });

      return response.status(200).json({ success: true, user: publicUser(user) });
    } catch (error) {
      return response.status(400).json({ code: error.code, error: error.message });
    }
  }

  if (method === 'PUT') {
    const { db } = await connectToDatabase();

    try {
      const { updatedFields, email } = body;

      if (!email) return response.status(400).json({ message: 'missing field' });

      const result = await db.collection('users').updateOne({ email }, { $set: updatedFields });

      if (result.acknowledged) {
        const user = await db.collection('users').findOne({ email });
        return response.status(200).json({ success: true, user: publicUser(user) });
      }

      return response.status(400).end();
    } catch (error) {
      return response.status(400).json({ code: error.code, error: error.message });
    }
  } else {
    response.setHeader('Allow', ['POST', 'GET']);
    return response.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);
