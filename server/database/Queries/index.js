const connection = require('../config/connection');

const testConnection = (req, res) => connection.query('SELECT * FROM products').then(console.log).catch(console.log);
module.exports = testConnection;
