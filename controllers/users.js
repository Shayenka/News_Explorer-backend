const bcrypt = require('bcryptjs');
const { generateAuthToken } = require('../utils/utils');
const { User } = require('../models/user');
const {
  InvalidError,
  ServerError,
  NotAuthorization,
} = require('../middlewares/errors');

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
      return res
        .status(409)
        .json({ error: 'Ya existe un usuario con ese email' });
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
      next(new InvalidError('Se pasaron datos incorrectos.'));
    } else {
      next(new ServerError('Ha ocurrido un error en el servidor.'));
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserWithCredentials(email, password);
    if (user) {
      const token = await generateAuthToken(user);
      return res.json({ token });
    }
    next(new NotAuthorization('Credenciales de inicio de sesión inválidas'));
  } catch (error) {
    next(new ServerError('Error interno del servidor'));
  }
};

module.exports = {
  getUserProfile,
  createUser,
  login,
};
