const signup = require('./signup');
const login = require('./login');
const { allPosts, addPosts, deletePost, getTrend, getCategory } = require('./post');
const {
  userinfo, userPosts, editProfileImg, editCoverImg, userProfile,
} = require('./user');

module.exports = {
  signup,
  login,
  userinfo,
  userPosts,
  addPosts,
  allPosts,
  editProfileImg,
  editCoverImg,
  deletePost,
  userProfile,
  getTrend,
  getCategory
};
