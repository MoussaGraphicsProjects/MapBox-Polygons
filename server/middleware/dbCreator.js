const fs = require('fs');
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: 'master',
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};

const checkAndCreateDatabase = async ()=> {
  try {
    console.log('Connecting to SQL Server...');
    const pool = await sql.connect(config);

    console.log('Checking if the database exists...');
    const dbName = 'MapBox2'; 
    const checkQuery = `
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '${dbName}')
      BEGIN
        PRINT('Database does not exist. Creating database...');
      END
    `;

    const result = await pool.request().query(checkQuery);
    if (result.rowsAffected.length == 0) {
      console.log('Database does not exist. Executing SQL script...');
      const sqlScript = fs.readFileSync('./db/dbcreation.sql', 'utf-8');
      await pool.request().batch(sqlScript);
      console.log('Database created successfully!');
    } else {
      console.log('Database already exists.');
    }

    await pool.close();
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    sql.close();
  }
}

module.exports = checkAndCreateDatabase;
