const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (email) => new Promise((resolve, reject) => {
  jsonwebtoken.sign(email, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

module.exports = generateToken;
