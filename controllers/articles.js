const Article = require('../models/article');
const { InvalidError, ServerError } = require('../middlewares/errors');

const saveArticle = async (req, res, next) => {
  try {
    const {
      id, title, text, date, source, link, image,
    } = req.body;
    const userId = req.user._id;
    // console.log(req.body);
    const article = new Article({
      // keyWord,
      id,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: userId,
    });
    // console.log(article);
    await article.save();
    console.log(article);

    res.status(201).json(article);
  } catch (error) {
    next(InvalidError('Datos del artículo inválidos.'));
  }
};

const getSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const articles = await Article.find({ owner: userId });
    res.json(articles);
  } catch (error) {
    next(NotFoundError('Artículos no encontrado'));
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
  console.log("prueba");
  try {
    const userId = req.user._id;
    const { articleId } = req.params;
    console.log(articleId);
    const deletedArticle = await Article.findOneAndDelete({
      id: articleId,
      owner: userId,
    });
    console.log(articleId);
    console.log(userId);
    // console.log(deletedArticle);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    res.json(deletedArticle);
    // console.log(deletedArticle);
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
