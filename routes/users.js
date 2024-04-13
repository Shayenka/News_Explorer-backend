const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const { jwtMiddleware } = require('../middlewares/auth');

router.get('/users/me', jwtMiddleware, usersController.getUserProfile);

module.exports = router;
