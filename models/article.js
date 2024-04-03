const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyWord: {
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

//   likes: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'user',
//     default: [],
//     select: false,
//   }

// {
//   "keyWord": "Programación",
//   "title": "javascript",
//   "text": "Es un lenguaje de programación interpretado...",
//   "date": "1 de abril del 2024",
//   "source": "Wikipedia",
//   "link": "https://es.wikipedia.org/wiki/JavaScript",
//   "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png",
//   "owner": "6609fe2a898ef547a80844fb"
// }

// https://localhost:3000/articles/save
