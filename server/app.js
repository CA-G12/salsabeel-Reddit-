const { join } = require('path');

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('./router');

app.disabled('x-powered-by');
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '..', 'public')));

app.use(router);
module.exports = app;
