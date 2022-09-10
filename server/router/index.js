const express = require('express');
const { join } = require('path');

const {
  signup,
  login,
  userinfo,
  userPosts,
  addPosts,
  allPosts,
  userProfile,
  getTrend,
  getCategory
} = require('../controllers');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'signup.html'));
}).post('/signup', signup);

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'login.html'));
}).post('/login', login);

router.get('/profile', userProfile);
router.get('/user', userinfo);
router.get('/userinfo', userPosts);
router.get('/userPosts', userPosts);
router.get('/posts', allPosts);
router.get('/posts/:category', getCategory);
router.get('/trending', getTrend);
router.post('/addPosts', addPosts);

module.exports = router;
