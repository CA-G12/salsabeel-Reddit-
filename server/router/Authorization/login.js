const bcryptjs = require('bcryptjs');
const { validateLogin } = require('../../config/validate');
const { userQueries } = require('../../database/Queries');
const generateToken = require('./jwt');

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
      if (data) {
        res.cookie('token', data);
        res.json('done');
      } else {
        res.json('Password not correct');
      }
    })
    .catch((err) => { res.json({ err }); });
};

module.exports = login;
