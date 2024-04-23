const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');

const jwtMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, SECRET_KEY);

    if (!payload) {
      return res.status(403).send({ message: 'El token no es valido' });
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).send({ message: 'El token no es valido' });
  }
};

module.exports = { jwtMiddleware };
