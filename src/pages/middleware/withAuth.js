import cookie, { serialize } from 'cookie';

const jwt = require('jsonwebtoken');

const jwtKey = process.env.JSON_TOKEN;

const jwtExpirySeconds = 24 * 60 * 60 * 7; // 7 day

const withAuth = (handler) => async (req, res) => {
  try {
    if (req.method !== 'POST') return handler(req, res);

    const cookies = cookie.parse(req.headers.cookie || '');

    const { token } = cookies;

    if (!token) return res.status(401).end();

    const payload = jwt.verify(token, jwtKey);

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000);

    if (payload.exp - nowUnixSeconds > 60 * 60 * 24 - 60 * 60) {
      return handler(req, res);
    }

    // If token expire in 1 day less 1 hour => regenerate token
    const newToken = jwt.sign({ email: payload.email }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds,
    });

    res.setHeader(
      'Set-Cookie',
      serialize('token', newToken, {
        path: '/',
        maxAge: jwtExpirySeconds * 1000,
      })
    );

    return handler(req, res);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
};

export default withAuth;
