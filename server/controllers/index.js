const signup = require('./signup');
const login = require('./login');
const { allPosts, addPosts, deletePost } = require('./post');
const {
  userinfo, userPosts, editProfileImg, editCoverImg,
} = require('./user');

module.exports = {
  signup, login, userinfo, userPosts, addPosts, allPosts, editProfileImg, editCoverImg, deletePost,
};
