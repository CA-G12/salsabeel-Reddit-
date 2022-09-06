const joi = require('joi');

const validateSignup = (info) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    username: joi.string().required().min(10).max(80),
    password: joi.string().required().min(8).max(15),
    confirmpassword: joi.ref('password'),
    type: joi.string().valid('user', 'seller'),
  });
  return schema.validateAsync(info);
};

const validateLogin = (info) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(15),
  });
  return schema.validateAsync(info);
};
module.exports = { validateSignup, validateLogin };
