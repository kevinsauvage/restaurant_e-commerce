import { hashPassword } from '../../../utils/bcrypt';
import connectToDatabase from '../../../utils/mongo';

export default async function handler(request, response) {
  const { method, body } = request;

  if (method === 'POST') {
    const { db } = await connectToDatabase();

    try {
      const { firstName, lastName, email, password } = body;

      if (!firstName || !lastName || !email || !password)
        return response.status(400).json({ message: 'missing field' });

      const hash = await hashPassword(password);

      const user = { email, firstName, lastName, password: hash };

      const result = await db.collection('users').insertOne(user);

      return response.status(200).json({ response: result, success: true });
    } catch (error) {
      if (error.code === 11_000)
        return response
          .status(409)
          .send({ code: error.code, error: error.message, success: false });

      return response.status(400).json({ code: error.code, error: error.message });
    }
  } else {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${method} Not Allowed`);
  }
}
