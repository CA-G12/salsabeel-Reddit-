const connection = require('../config/connection');

class User {
  constructor() {
    let query;
  }

  addUser({
    username, email, hashPassword,
  }) {
    this.query = {
      text: 'INSERT INTO users (username,email,hashpassword) values($1,$2,$3) returning id',
      values: [username, email, hashPassword],
    };
    return connection.query(this.query);
  }

  getEmailUser(email) {
    this.query = {
      text: 'SELECT email FROM users where email = $1',
      values: [email],
    };
    return connection.query(this.query);
  }

  getHashPassword(email) {
    this.query = {
      text: 'SELECT hashPassword,id FROM users where email = $1',
      values: [email],
    };
    return connection.query(this.query);
  }

  getCredential(email) {
    this.query = {
      text: 'SELECT id,userName FROM users where email = $1',
      values: [email],
    };
    return connection.query(this.query);
  }
}
const userQueries = new User();
module.exports = userQueries;
