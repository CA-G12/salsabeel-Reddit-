const connection = require('../config/connection');

class User {
  constructor() {
    let sql;
  }

  addUser({
    username, email, hashPassword,
  }) {
    this.sql = {
      text: 'INSERT INTO users (username,email,hashpassword) values($1,$2,$3) returning id',
      values: [username, email, hashPassword],
    };
    return connection.query(this.sql);
  }

  getEmailUser(email) {
    this.sql = {
      text: 'SELECT email FROM users where email = $1',
      values: [email],
    };
    return connection.query(this.sql);
  }

  getHashPassword(email) {
    this.sql = {
      text: 'SELECT hashPassword,id FROM users where email = $1',
      values: [email],
    };
    return connection.query(this.sql);
  }

  getCredential(email) {
    this.sql = {
      text: 'SELECT id,userName FROM users where email = $1',
      values: [email],
    };
    return connection.query(this.sql);
  }

  getUserInfo(id) {
    this.sql = {
      text: 'SELECT email ,userName,imageUrl,coverURL FROM userInfo where id =$1',
      values: [id],
    };
    return connection.query(this.sql);
  }

  getUserPosts(id) {
    this.sql = {
      text: 'SELECT p.id,p.userId,p.content,p.title,p.category,p.imageUrl,COALESCE(sum(a.liked),0)as like,COALESCE(sum(a.rated),0) as rate FROM posts p left join actions a on a.postId= p.id Where p.userId=$1 group by p.id,p.userId ,p.content,p.title,p.category,p.imageUrl ;',
      values: [id],
    };
    return connection.query(this.sql);
  }

  updateUserImage({ imageUrl, id }) {
    this.sql = {
      text: 'UPDATE users set imageUrl=$1 where id =$2',
      values: [imageUrl, id],
    };
    return connection.query(this.sql);
  }

  updateUserCoverImage({ coverUrl, id }) {
    this.sql = {
      text: 'UPDATE users set coverUrl=$1 where id =$2',
      values: [coverUrl, id],
    };
    return connection.query(this.sql);
  }
}

const userQueries = new User();
module.exports = userQueries;
