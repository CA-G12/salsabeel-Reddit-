const connection = require('../config/connection');

class Posts {
  constructor() {
    let sql;
  }

  getAllPosts() {
    this.sql = 'Select p.id, p.userId,p.content,p.title,p.category,p.imageUrl,COALESCE(sum(a.liked),0)as like,COALESCE(sum(a.rated),0)as rate FROM posts p Full Outer join actions a on a.postId= p.id group by p.id,p.userId ,p.content,p.title,p.category,p.imageUrl;';
    return connection.query(this.sql);
  }

  getTrending() {
    this.sql = 'Select * From (SELECT p.id, p.userId,p.content,p.title,p.category,p.imageUrl,COALESCE(sum(a.liked),0)as like,COALESCE(sum(a.rated),0)as rate FROM posts p left join actions a on a.postId= p.id group by p.id,a.postId,p.userId,p.content,p.title,p.category,p.imageUrl)as trend Order By trend.like Desc Limit 5 ;';
    return connection.query(this.sql);
  }

  getPostByCategory(category) {
    this.sql = {
      text: 'SELECT p.id,p.userId,p.content,p.title,p.category,p.imageUrl,COALESCE(sum(a.liked),0)as like,COALESCE(sum(a.rated),0) as rate FROM posts p left join actions a on a.postId= p.id Where category=$1 group by p.id,p.userId ,p.content,p.title,p.category,p.imageUrl ;',
      values: [category],
    };
    return connection.query(this.sql);
  }

  deletePost({ postId, userId }) {
    this.sql = {
      text: 'DELETE FROM posts where id=$1 userId=$2; returning id',
      values: [postId, userId],
    };
    return connection.query(this.sql);
  }

  addPost({
    userId, content, title, category, imageUrl,
  }) {
    this.sql = {
      text: 'INSERT INTO posts (userId,content,title,category,imageUrl) values($1,$2,$3,$4,$5) returning *',
      values: [userId, content, title, category, imageUrl],
    };
    return connection.query(this.sql);
  }
}

const postQueries = new Posts();
module.exports = postQueries;
