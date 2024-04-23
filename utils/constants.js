const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/news_explorer';
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

module.exports = { PORT, MONGODB_URL, SECRET_KEY };
