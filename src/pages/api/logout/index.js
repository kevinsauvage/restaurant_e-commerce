import cookie from 'cookie';

const logout = (_request, response) => {
  response.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      expires: new Date(0),
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    })
  );
  response.statusCode = 200;
  response.json({ success: true });
};

export default logout;
