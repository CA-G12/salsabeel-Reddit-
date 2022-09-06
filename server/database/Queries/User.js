const connection = require('../config/connection');

class User {
  constructor() {
    const query = '';
  }

  addUser({
    username, email, hashPassword, type,
  }) {
    this.query = {
      text: 'INSERT INTO users (userName,email,hashPassword,type) values($1,$2,$3,$4) returning email',
      values: [username, email, hashPassword, type],
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
      text: 'SELECT hashPassword FROM users where email = $1',
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

module.exports = User;
