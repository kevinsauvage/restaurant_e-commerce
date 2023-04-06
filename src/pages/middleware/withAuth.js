import cookie, { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

const jwtKey = process.env.JSON_TOKEN;

const jwtExpirySeconds = 24 * 60 * 60 * 7; // 7 day

const withAuth = (handler) => async (request, response) => {
  try {
    if (request.method !== 'POST') return handler(request, response);

    const cookies = cookie.parse(request.headers.cookie || '');

    const { token } = cookies;

    if (!token) return response.status(401).end();

    const payload = jwt.verify(token, jwtKey);

    const nowUnixSeconds = Math.round(Date.now() / 1000);

    if (payload.exp - nowUnixSeconds > 60 * 60 * 24 - 60 * 60) {
      return handler(request, response);
    }

    // If token expire in 1 day less 1 hour => regenerate token
    const newToken = jwt.sign({ email: payload.email }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds,
    });

    response.setHeader(
      'Set-Cookie',
      serialize('token', newToken, {
        maxAge: jwtExpirySeconds * 1000,
        path: '/',
      })
    );

    return handler(request, response);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).end();
    }
    return response.status(400).end();
  }
};

export default withAuth;
