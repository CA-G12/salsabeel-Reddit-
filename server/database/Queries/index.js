const connection = require('../config/connection');
const userQueries = require('./User');

const testConnection = ( req, res ) => connection.query('SELECT * FROM users').then(console.log).catch(console.log);
module.exports = { testConnection, userQueries };
