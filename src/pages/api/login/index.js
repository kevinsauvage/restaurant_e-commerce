import { serialize } from 'cookie';
import publicUser from '../../../helpers/publicUser';
import { comparePassword } from '../../../utils/bcrypt';
import connectToDatabase from '../../../utils/mongo';

const jwt = require('jsonwebtoken');

const jwtKey = process.env.JSON_TOKEN;
const jwtExpirySeconds = 24 * 60 * 60; // 1 day

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: 'missing field' });

      const { db } = await connectToDatabase();

      const user = await db.collection('users').findOne({ email });

      const response = await comparePassword(password, user.password);

      if (response) {
        const token = jwt.sign({ email }, jwtKey, {
          algorithm: 'HS256',
          expiresIn: jwtExpirySeconds,
        });

        res.setHeader(
          'Set-Cookie',
          serialize('token', token, {
            path: '/',
            maxAge: jwtExpirySeconds * 1000,
          })
        );

        return res.status(200).json({ success: true, user: publicUser(user) });
      }

      return res
        .status(401)
        .json({ success: false, message: 'Wrong password' });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
