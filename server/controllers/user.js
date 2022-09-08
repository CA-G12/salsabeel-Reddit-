const { join } = require('path');
const { userQueries } = require('../database/Queries');

const userinfo = (req, res) => {
  if (req.user) {
    res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'profile.html'));
  } else {
    res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'login.html'));
  }
};

const userPosts = (req, res) => {
  if (req.user) {
    userQueries.getUserPosts(req.user.data.id)
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

module.exports = {
  userinfo, userPosts, editProfileImg, editCoverImg,
};
