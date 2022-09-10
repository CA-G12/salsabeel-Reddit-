const { join } = require('path');
const { userQueries } = require('../database/Queries');

const userProfile = (req, res) => {
  if (req.user) {
    res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'profile.html'));
  } else {
    res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'login.html'));
  }
};

const userinfo = (req, res) => {
  if (req.params.id||req.user) {
    const id = req.params.id||req.user.data.id;
    userQueries.getUserInfo(id)
      .then((data) => res.json({ info: data.rows }))
      .catch((err) => res.json({ err }));
  }
};
const userPosts = (req, res) => {
  if (req.params.id||req.user) {
    const id = req.params.id||req.user.data.id;
    userQueries.getUserPosts(id)
      .then((data) => res.json({ posts: data.rows }))
      .catch((err) => res.json({ err }));
  }
};

const editProfileImg = (req, res) => {
  if (req.user) {
    const { imageUrl } = req.body;
    userQueries.updateUserImage(imageUrl)
      .then(() => res.json({ done: 'done' }))
      .catch((err) => res.json({ err }));
  }
};
const editCoverImg = (req, res) => {
  if (req.user) {
    const { coverUrl } = req.body;
    userQueries.updateUserImage(coverUrl)
      .then(() => res.json({ done: 'done' }))
      .catch((err) => res.json({ err }));
  }
};

const logout = (req, res) => {
  if (req.user) {
    res.clearCookie('token');
    res.json({done :'done'});
  }
};
module.exports = {
  userinfo, userPosts, editProfileImg, editCoverImg, userProfile, logout,
};
