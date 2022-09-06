const bcryptjs = require('bcryptjs');
const signUp = require('./jwt/index');
const { validateSignup } = require('../../config/validate');
const { User } = require('../../database/Queries');

const userObj = new User();

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
    .then((InsertedEmail) => signUp(InsertedEmail.rows[0], res))
    .catch((err) => res.json({ err }));
};

module.exports = { signup };
