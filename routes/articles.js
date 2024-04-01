const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const articlesController = require('../controllers/articles');
const { jwtMiddleware } = require('../middlewares/auth');

const { validateURL } = require('../middlewares/validator');

// Guardar artículo
router.post(
  '/articles/save',
  jwtMiddleware,
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
    }),
  }),
  articlesController.saveArticle,
);

// Devuelve todos los artículos guardados por el usuario
router.get('/articles', jwtMiddleware, articlesController.getSavedArticles);

// Crear artículo
router.post(
  '/articles',
  jwtMiddleware,
  celebrate({
    body: Joi.object().keys({
      keyWord: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
    }),
  }),
  articlesController.createArticle,
);

// Eliminar artículo
router.delete(
  '/articles/articleId',
  jwtMiddleware,
  articlesController.deleteArticleById,
);

module.exports = router;
