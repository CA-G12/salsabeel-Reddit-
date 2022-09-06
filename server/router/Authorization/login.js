const bcryptjs = require('bcryptjs');
const { validateLogin } = require('../../config/validate');
const { User } = require('../../database/Queries');
const signup = require('./jwt/index');

const userObj = new User();

const login = (req, res) => {
  const { email, password } = req.body;

  validateLogin(req.body)
    .then((data) => userObj.getEmailUser(data.email))
    .then((data) => { if (data.rows.length === 0) { throw new Error('email is not exists'); } })
    .then(() => userObj.getHashPassword(email))
    .then((data) => bcryptjs.compare(password, data.rows[0].hashpassword, (err, success) => {
      if (err) { throw new Error('hash string  is not correct'); } else if (success) signup(email, res);
      else res.json({ error: 'password is not Correct ' });
    }))
    .catch((err) => { console.log(err); res.json({ err }); });
};

module.exports = login;
