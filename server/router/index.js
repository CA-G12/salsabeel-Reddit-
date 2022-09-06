const express = require('express');
const { join } = require('path');
const { signup } = require('./Authorization/signup');
const login = require('./Authorization/login');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup'));
}).post('/signup', signup);

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'login'));
}).post('/login', login);

module.exports = router;
