const { validateSignup, validateLogin } = require('../../config/validate');

const signup = (req, res) => {
  validateSignup(req.body)
    .then((data) => console.log(data.email))
    .catch((err) => { throw new Error(err); });
  res.json();
};
const login = (req, res) => {
  validateLogin(req.body)
    .then((data) => console.log(data))
    .catch((err) => { throw new Error(err); });
  res.json();
};
module.exports = { signup, login };
