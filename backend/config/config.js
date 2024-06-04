const dotenv = require('dotenv');
dotenv.config();
const options = {ssl:{rejectUnauthorized:false, require: true}}
module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'hospital_referral',
    host: process.env.DB_HOST || 'mysql-db',
    dialect: 'mysql', 
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'hospital_referral',
    host: process.env.DB_HOST || 'mysql-db',
    dialect: 'mysql', 
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'hospital_referral',
    host: process.env.DB_HOST || 'mysql-db',
    dialect: 'mysql',
  },
};
