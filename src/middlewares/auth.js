import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não informado'
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(
      token,
      'agentemoda-secret'
    );

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }
}