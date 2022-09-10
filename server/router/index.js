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
  getCategory,
  getUserAction,
  updateLikeAc,
  updateRateAc,
  deletePost,
  logout,
  cretinPost,
} = require('../controllers');

const router = express.Router();

router.get('/signup', (req, res) => {
  if (req.user) {
    res.sendFile(join(__dirname, '..', 'public', 'pages', 'home.html'));
  } else {
    res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'signup.html'));
  }
}).post('/signup', signup);

router.get('/login', (req, res) => {
  if (req.user) {
    res.sendFile(join(__dirname, '..', 'public', 'pages', 'home.html'));
  } else {
    res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'login.html'));
  }
}).post('/login', login);
router.get('/logout', logout);
router.get('/profile/:id?', userProfile);
router.get('/user/:id?', userinfo);
router.get('/userPosts/:id?', userPosts);

router.get('/posts', allPosts);
router.get('/posts', allPosts);
router.post('/cretinPost', cretinPost);
router.get('/posts/:category', getCategory);
router.post('/addPosts', addPosts);
router.delete('/deletePost', deletePost);

router.get('/trending', getTrend);
router.post('/userAction', getUserAction);
router.post('/userRate', updateRateAc);
router.post('/userLike', updateLikeAc);

module.exports = router;
