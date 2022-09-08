const express = require('express');
const { join } = require('path');

const {
  login, signup, userinfo, userPosts, addPosts, allPosts,
} = require('../controllers');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'signup.html'));
}).post('/signup', signup);

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'login.html'));
}).post('/login', login);

router.get('/user', userinfo);
router.get('/userPosts', userPosts);
router.get('/posts', allPosts);
router.post('/addPosts', addPosts);

module.exports = router;
