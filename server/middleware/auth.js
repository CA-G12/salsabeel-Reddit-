const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const authorization = (req, res, next) => {
  const { token } = req.cookies;
  jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (!err) {
      req.user = {
        data,
      };
    }
    next();
  });
};
module.exports = authorization;
