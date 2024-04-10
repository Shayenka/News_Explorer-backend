const bcrypt = require('bcryptjs');
const { generateAuthToken } = require('../utils/utils');
const { User } = require('../models/user');
const { InvalidError, ServerError } = require('../middlewares/errors');

const getUserProfile = (req, res) => {
  const { user } = req;
  res.json({ email: user.email, name: user.name });
};

const hashPassword = async (password) => bcrypt.hash(password, 10);

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw InvalidError('Ya Existe un usuario con ese email');
    }

    const passwordHashed = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: passwordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(InvalidError('Se pasaron datos incorrectos.'));
    } else {
      next(ServerError('Ha ocurrido un error en el servidor.'));
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserWithCredentials(email, password);
    if (user) {
      const token = await generateAuthToken(user);
      return res.send({ token });
    }
    throw InvalidCredentialsError('Credenciales de inicio de sesión inválidas');
  } catch (error) {
    return res.status(404).send('Not found');
  }
};

module.exports = {
  getUserProfile,
  createUser,
  login,
};
