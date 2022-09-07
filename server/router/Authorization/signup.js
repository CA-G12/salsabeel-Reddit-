const bcryptjs = require('bcryptjs');
const generateToken = require('./jwt');
const { validateSignup } = require('../../config/validate');
const { userQueries } = require('../../database/Queries');

const signup = (req, res) => {
  const {
    email, username, password,
  } = req.body;
  validateSignup(req.body)
    .then((data) => userQueries.getEmailUser(data.email))
    .then((data) => { if (data.rows.length > 0) { throw new Error('email exits'); } })
    .then(() => bcryptjs.hash(password, 15))
    .then((hashPassword) => userQueries.addUser({
      username, email, hashPassword,
    }))
    .then((id) => generateToken(id.rows[0]))
    .then((data) => {
      res.cookie('token', data);
      res.json('done');
    })
    .catch((err) => res.json({ err }));
};

module.exports = { signup };
