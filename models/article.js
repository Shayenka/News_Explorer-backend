const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  // keyWord: {
  //   type: String,
  //   required: true,
  // },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^https?:\/\/.+$/.test(value),
      message: (props) => `${props.value} no es una URL válida`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^https?:\/\/.+$/.test(value),
      message: (props) => `${props.value} no es una URL válida`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
