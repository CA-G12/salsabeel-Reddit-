const signup = require('./signup');
const login = require('./login');
const {
  allPosts, addPosts, deletePost, getTrend, getCategory, cretinPost
} = require('./post');
const {
  userinfo, userPosts, editProfileImg, editCoverImg, userProfile, logout,
} = require('./user');
const { getUserAction, updateLikeAc, updateRateAc } = require('./action');

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
  getCategory,
  getUserAction,
  updateLikeAc,
  updateRateAc,
  logout,
  cretinPost,
};
