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

const createDatabaseAndTable =async function () {
  try {
    // Connect to the SQL Server
    let pool = await sql.connect(config);

    // SQL commands to create database and table
    const createDbQuery = `
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Mapbox')
      BEGIN
          CREATE DATABASE Mapbox;
      END
    `;
    const createTableQuery = `
      USE Mapbox;
      CREATE TABLE [dbo].[Polygons](
        [ID] [uniqueidentifier] NOT NULL,
        [Title] [nvarchar](100) NULL
      );
      CREATE TABLE [dbo].[Users](
        [ID] [uniqueidentifier] NULL,
        [UserName] [nvarchar](100) NULL,
        [Password] [nvarchar](max) NULL
      );
      CREATE TABLE [dbo].[Vertices](
        [ID] [uniqueidentifier] NOT NULL,
        [PolygonID] [uniqueidentifier] NOT NULL,
        [Longitude] [decimal](18, 6) NOT NULL,
        [Latitude] [decimal](18, 6) NOT NULL,
        [VertexIndex] [int] NOT NULL
      );
    `;

    // Execute the SQL queries
    await pool.request().query(createDbQuery);
    console.log("Database 'Mapbox' created successfully!");

    await pool.request().query(createTableQuery);
    console.log("Tables  created successfully inside 'Mapbox'!");

    // Close the connection
    pool.close();
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
}

module.exports = createDatabaseAndTable;
