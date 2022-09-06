const { join } = require('path');

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const authorization = require('./middleware/auth');

const app = express();
const router = require('./router');

app.disabled('x-powered-by');
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authorization);

app.get('/', (req, res) => {
  if (req.user) res.sendFile(join(__dirname, '..', 'public'));
  else { res.sendFile(join(__dirname, '..', 'public', 'login'))}
});
app.use(express.static(join(__dirname, '..', 'public','login')))
app.use(router);
module.exports = app;
