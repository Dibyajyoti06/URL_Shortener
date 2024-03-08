const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth');
const connectMongoDB = require('./connect');

const app = express();
const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url', restrictTo(['NORMAL']), urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
