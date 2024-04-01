const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const { jwtMiddleware } = require('../middlewares/auth');

// Devuelve información sobre el usuario conectado (correo electrónico y nombre)
router.get('/users/me', jwtMiddleware, usersController.getUserProfile);

module.exports = router;
