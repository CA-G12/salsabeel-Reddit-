const { join } = require('path');

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('./router');

const { PORT } = process.env;

app.set('port', PORT);
app.disabled('x-powered-by');
app.use(router);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));

module.exports = app;
