const connection = require('../config/connection');

class Actions {
  constructor() {
    const query = '';
  }

  getUserActions({ postId, userId }) {
    this.query = {
      text: 'SELECT rated , liked FROM actions where userId=$2 and postId=$1 ',
      values: [postId, userId],
    };
    return connection.query(this.query);
  }

  updateRate({ postId, userId, newRate }) {
    this.query = {
      text: 'UPDATE actions set rated =$3 where userId=$2 and postId=$1 ',
      values: [postId, userId, newRate],
    };
    return connection.query(this.query);
  }

  updateLike({ postId, userId, newLike }) {
    this.query = {
      text: 'UPDATE actions set liked =$3 where userId=$2 and postId=$1 returning * ',
      values: [postId, userId, newLike],
    };
    return connection.query(this.query);
  }

  insertAction({ postId, userId, newLike, newRate }) {
    this.query = {
      text: 'INSERT INTO actions( postId,userId,rated,liked) values ($1,$2,$3,$4) returning *',
      values: [postId, userId ,newRate, newLike],
    };
    return connection.query(this.query);
  }
}

const actionQueries = new Actions();
module.exports = actionQueries;
