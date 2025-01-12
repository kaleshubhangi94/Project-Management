const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME, 
//   process.env.DB_USER, 
//   process.env.DB_PASSWORD, 
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     logging: false,
//     port: process.env.DB_PORT || 3306,
//   }
// );
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database successful.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });
module.exports = sequelize;
