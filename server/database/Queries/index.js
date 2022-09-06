const connection = require('../config/connection');
const user = require('./User');

const testConnection = ( req, res ) => connection.query('SELECT * FROM products').then(console.log).catch(console.log);
module.exports = { testConnection, user };
