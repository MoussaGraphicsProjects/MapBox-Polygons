import sql from 'mssql';
import createDatabaseAndTable from '../middleware/dbCreator.js';
import { config } from 'dotenv';
config();

const _config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};

await createDatabaseAndTable();

const poolPromise = new sql.ConnectionPool(_config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.error('Database connection failed: ', err));

export default poolPromise;
