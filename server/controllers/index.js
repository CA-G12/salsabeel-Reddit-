const signup = require('./signup');
const login = require('./login');
const { allPosts, addPosts } = require('./post');
const { userinfo, userPosts } = require('./user');

module.exports = {
  signup, login, userinfo, userPosts, addPosts, allPosts,
};
