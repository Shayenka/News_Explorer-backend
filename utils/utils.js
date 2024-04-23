const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./constants');

const generateAuthToken = (data) => {
  const token = jwt.sign(
    { _id: data._id, name: data.name, email: data.email },
    SECRET_KEY,
    { expiresIn: '7d' },
  );
  return token;
};

module.exports = { generateAuthToken };
