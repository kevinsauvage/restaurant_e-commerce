import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

import publicUser from '../../../helpers/publicUser';
import { comparePassword } from '../../../utils/bcrypt';
import connectToDatabase from '../../../utils/mongo';

const jwtKey = process.env.JSON_TOKEN;
const jwtExpirySeconds = 24 * 60 * 60; // 1 day

export default async function handler(request, response) {
  const { method, body } = request;

  if (method === 'POST') {
    try {
      const { email, password } = body;

      if (!email || !password) return response.status(400).json({ message: 'missing field' });

      const { db } = await connectToDatabase();

      const user = await db.collection('users').findOne({ email });

      if (!user)
        return response
          .status(404)
          .json({ error: 'user not found', name: 'notFound', success: false });

      const result = await comparePassword(password, user.password);

      if (result) {
        const token = jwt.sign({ email }, jwtKey, {
          algorithm: 'HS256',
          expiresIn: jwtExpirySeconds,
        });

        response.setHeader(
          'Set-Cookie',
          serialize('token', token, {
            maxAge: jwtExpirySeconds * 1000,
            path: '/',
          })
        );

        return response.status(200).json({ success: true, user: publicUser(user) });
      }

      return response.status(401).json({ message: 'Wrong password', success: false });
    } catch (error) {
      return response.status(400).json(error);
    }
  } else {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${method} Not Allowed`);
  }
}
