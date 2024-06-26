const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const path = require('path');
const cors = require('cors');
const requestLogger = require('./middlewares/request.log');
const errorLogger = require('./middlewares/error.log');
const { PORT, MONGODB_URL } = require('./utils/constants');

const usersPath = path.join(__dirname, 'routes', 'users');
const users = require(usersPath);
const articlePath = path.join(__dirname, 'routes', 'articles');
const articles = require(articlePath);

const { login, createUser } = require('./controllers/users');

require('dotenv').config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(requestLogger);
}

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`);
  });

app.use(users);
app.use(articles);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', createUser);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página principal!');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
