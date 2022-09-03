require('dotenv').config();
const { Pool } = require('pg');

const {
  DATABASE_URL, DATABASE_DEV_URL, DATABASE_TEST_URL, NODE_ENV,
} = process.env;
console.log(NODE_ENV)
let database;
switch (NODE_ENV) {
  case 'production':
    database = DATABASE_URL;
    break;
  case 'development':
    database = DATABASE_DEV_URL;
    break;
  case 'test':
    database = DATABASE_TEST_URL;
    break;
  default:
    throw new Error('No Database Found');
}
module.exports = new Pool({
  connectionString: database,
  ssl: NODE_ENV === 'production' ? {
    rejectUnauthorized: false,
  }
    : false,
});
