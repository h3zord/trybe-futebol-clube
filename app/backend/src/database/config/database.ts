import 'dotenv/config';
import { Options } from 'sequelize';

let config: Options

process.env.PGSSL === 'true' ? config = {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  dialect: 'postgres',
  define: {
    timestamps: true,
  },
  dialectOptions: {
    schema: 'public',
    ssl: {
      require: true
    }
  },
} : config = {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  dialect: 'postgres',
  define: {
    timestamps: true,
  },
  dialectOptions: {
    schema: 'public',
  },
}



module.exports = config;
