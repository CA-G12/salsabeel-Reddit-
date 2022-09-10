const bcryptjs = require('bcryptjs');
const { validateLogin } = require('../config/validate');
const { userQueries } = require('../database/Queries');
const generateToken = require('../router/Authorization/jwt');

const login = (req, res) => {
  const { email, password } = req.body;
  validateLogin(req.body)
    .then((data) => userQueries.getEmailUser(data.email))
    .then((data) => { if (data.rows.length === 0) { throw new Error('email is not exists'); } })
    .then(() => userQueries.getHashPassword(email))
    .then((data) => new Promise((resolve, reject) => {
      bcryptjs.compare(password, data.rows[0].hashpassword, (err, success) => {
        if (err) reject(err);
        else { resolve(success); }
      });
    }))
    .then((data) => {
      if (!data) { throw new Error('Password not correct'); } else { return userQueries.getCredential(email); }
    })
    .then((data) => generateToken({ id: data.rows[0].id }))
    .then((token) => {
      res.cookie('token', token);
      res.json('done');
    })
    .catch((err) => { res.json({ err }); });
};

module.exports = login;
