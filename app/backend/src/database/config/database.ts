import 'dotenv/config';
import { Options } from 'sequelize';

// const config: Options = {
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || '123456',
//   database: 'TRYBE_FUTEBOL_CLUBE',
//   host: process.env.DB_HOST || 'localhost',
//   port: Number(process.env.DB_PORT) || 3002,
//   dialect: 'mysql',
//   dialectOptions: {
//     timezone: 'Z',
//   },
//   logging: false,
// }


const config: Options = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST, 
  port: Number(process.env.MYSQLPORT),
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
