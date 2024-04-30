const Article = require('../models/article');
const { InvalidError, ServerError } = require('../middlewares/errors');

const saveArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const userId = req.user._id;

    const article = new Article({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: userId,
    });

    await article.save();

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

const getSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const articles = await Article.find({ owner: userId });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const {
      keyWord, title, text, date, source, link, image,
    } = req.body;
    const newArticle = await Article.create({
      keyWord,
      title,
      text,
      date,
      source,
      link,
      image,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(InvalidError('Datos del artículo inválidos.'));
    } else {
      next(ServerError('Ha ocurrido un error en el servidor.'));
    }
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { articleId } = req.params;
    const deletedArticle = await Article.findOneAndDelete({
      _id: articleId,
      owner: userId,
    });
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    res.json(deletedArticle);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveArticle,
  getSavedArticles,
  createArticle,
  deleteArticleById,
};
