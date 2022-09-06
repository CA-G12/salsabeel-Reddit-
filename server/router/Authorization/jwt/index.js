const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const signup = (id, res) => {
  jsonwebtoken.sign(id, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      console.log(`{ err: ${err}}`);
    } else {
      console.log(data)
      res.cookie('token', data);
      res.json('done')
    }
  });
};
module.exports = signup;
