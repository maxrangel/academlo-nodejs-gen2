const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Localhost connection
const sequelize = new Sequelize({
  host: process.env.DB_HOST, // localhost
  username: process.env.DB_USER, // postgres
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB, // example
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Connect to Heroku cloud
// const sequelize = new Sequelize({
// 	host: 'heroku_host',
// 	username: 'heroku_user',
// 	password: 'heroku_password',
// 	port: 5432,
// 	database: 'heroku_database',
// 	dialect: 'postgres',
// 	dialectOptions: {
// 		ssl: {
// 			require: true,
// 			rejectUnauthorized: false,
// 		},
// 	},
// });

module.exports = { sequelize };
