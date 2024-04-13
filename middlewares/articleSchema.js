const { Joi } = require('celebrate');
const { validateURL } = require('./validator');

const articleSchema = Joi.object().keys({
  keyword: Joi.string().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  date: Joi.string().required(),
  source: Joi.string().required(),
  link: Joi.string().required().custom(validateURL),
  image: Joi.string().required().custom(validateURL),
});

module.exports = articleSchema;
