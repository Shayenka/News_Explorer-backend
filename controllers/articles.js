const Article = require('../models/article');
const { InvalidError, ServerError } = require('../middlewares/errors');

// Guardar artículo
const saveArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const userId = req.user._id; // Obtener el ID del usuario desde el JWT

    // Crear un nuevo artículo asociado al usuario
    const article = new Article({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: userId, // Asociar el ID del usuario con el artículo
    });

    // Guardar el artículo en la base de datos
    await article.save();

    res.status(201).json(article); // Responder con el artículo guardado
  } catch (error) {
    next(error);
  }
};

// Artículos guardados por el usuario
const getSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const articles = await Article.find({ owner: userId });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

// Artículos creados por el usuario
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
    console.log(error);
    if (error.name === 'ValidationError') {
      next(InvalidError('Datos del artpículo inválidos.'));
    } else {
      next(ServerError('Ha ocurrido un error en el servidor.'));
    }
  }
};

// Artículos eliminado por el usuario
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
