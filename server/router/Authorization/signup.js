const bcryptjs = require('bcryptjs');
const { validateSignup, validateLogin } = require('../../config/validate');
const { user } = require('../../database/Queries');
const signUp = require('./jwt/index');

const userObj = new user();

const signup = (req, res) => {
  const {
    email, username, type, password,
  } = req.body;

  validateSignup(req.body).then((data) => userObj.getEmailUser(data.email))
    .then((data) => { if (data.rows.length > 0) { throw new Error('email exits'); } })
    .then(() => bcryptjs.hash(password, 15))
    .then((hashPassword) => userObj.addUser({
      username, email, hashPassword, type,
    }))
    .then((id) => signUp(id.rows[0], res))
    .catch((err) => {console.log(err); res.json({ err })});
};
const login = (req, res) => {
  validateLogin(req.body)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  res.json();
};
module.exports = { signup, login };
