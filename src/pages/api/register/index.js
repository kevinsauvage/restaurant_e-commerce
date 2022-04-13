import { hashPassword } from '../../../utils/bcrypt';
import connectToDatabase from '../../../utils/mongo';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { db } = await connectToDatabase();

    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password)
        return res.status(400).json({ message: 'missing field' });

      const hash = await hashPassword(password);

      const user = { firstName, lastName, email, password: hash };

      const response = await db.collection('users').insertOne(user);

      return res.status(200).json({ success: true, response });
    } catch (error) {
      if (error.code === 11000)
        return res.status(409).send({ success: false, error });

      return res.status(400).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
