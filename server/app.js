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
  if (req.user) res.sendFile(join(__dirname, '..', 'public', 'pages', 'home.html'));
  else res.sendFile(join(__dirname, '..', 'public'));
});
app.use(express.static(join(__dirname, '..', 'public')));
app.use(router);
app.use((req, res) => {
  console.log(join(__dirname, '..', 'public', 'error', '404.html'));
  res.status(404).sendFile(join(__dirname, '..', 'public', 'error', '404.html'));
});
app.use((err, req, res) => {
  res.status(500).sendFile(join(__dirname, '..', 'public', 'error', '500.html'));
});
module.exports = app;
