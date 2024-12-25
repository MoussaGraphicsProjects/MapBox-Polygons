import sql from 'mssql';
import { config } from 'dotenv';
config();

const createDatabaseAndTable =async function () {
  try {
    const _config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST,
      database: "master",
      options: {
        encrypt: true, 
        trustServerCertificate: true, 
      },
    };
    const poolPromise = new sql.ConnectionPool(_config)
      .connect()
      .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
      })
      .catch(err => console.error('Database connection failed: ', err));

    const createDbQuery = `
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Mapbox')
      BEGIN
          CREATE DATABASE Mapbox;
      END
    `;
    const createPolygonsTableQuery = `
    USE Mapbox;
    
    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Polygons]') AND type = 'U')
    BEGIN
        CREATE TABLE [dbo].[Polygons](
            [ID] [uniqueidentifier] NOT NULL,
            [Title] [nvarchar](100) NULL
        ); 
    END;`;

      const createUsersTableQuery = `USE Mapbox;
      IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type = 'U')
      BEGIN
      CREATE TABLE [dbo].[Users](
        [ID] [uniqueidentifier] NULL,
        [UserName] [nvarchar](100) NULL,
        [Password] [nvarchar](max) NULL
      );
      END;`
      const createVerticesTableQuery = `USE Mapbox;
      IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Vertices]') AND type = 'U')
      BEGIN
      CREATE TABLE [dbo].[Vertices](
        [ID] [uniqueidentifier] NOT NULL,
        [PolygonID] [uniqueidentifier] NOT NULL,
        [Longitude] [decimal](18, 6) NOT NULL,
        [Latitude] [decimal](18, 6) NOT NULL,
        [VertexIndex] [int] NOT NULL
      );
      END;`;

    const pool = await poolPromise;
    await pool.request().query(createDbQuery);
    await pool.request().query(createPolygonsTableQuery);
    await pool.request().query(createUsersTableQuery);
    await pool.request().query(createVerticesTableQuery);
    console.log("Tables  created successfully inside 'Mapbox'!");
    pool.close();
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
}

export default createDatabaseAndTable;
