const express = require('express');

const router = express.Router();
const { celebrate } = require('celebrate');
const articlesController = require('../controllers/articles');
const { jwtMiddleware } = require('../middlewares/auth');

router.post(
  '/articles/save',
  jwtMiddleware,
  celebrate({ body: articleSchema }),
  articlesController.saveArticle,
);

router.get('/articles', jwtMiddleware, articlesController.getSavedArticles);

router.post(
  '/articles',
  jwtMiddleware,
  celebrate({ body: articleSchema }),
  articlesController.createArticle,
);

router.delete(
  '/articles/articleId',
  jwtMiddleware,
  articlesController.deleteArticleById,
);

module.exports = router;
