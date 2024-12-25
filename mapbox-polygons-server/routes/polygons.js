import express  from 'express';
import { v4 as uuidv4 } from  'uuid'; // To manually generate GUIDs if needed
import poolPromise from '../db/config.js';
import authenticateToken from  '../middleware/auth.js';

const router = express.Router();

import { check, validationResult }  from 'express-validator';

router.post(
  '/post',
  authenticateToken,
  [
    check('id').notEmpty().withMessage('ID is required'),
    check('title').notEmpty().withMessage('Title is required'),
    check('coordinates').notEmpty().withMessage('PolyData is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { id, title, coordinates } = req.body;

    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', id)
        .input('title', title)
        .query(
          `INSERT INTO Polygons (ID, Title) 
           VALUES (@id, @title)`
        );

      const polyData = coordinates.map((vertex, index) => {
        return {
          id: uuidv4(),
          polygonID: id, // Assuming id is the PolygonID
          vertexIndex: index,
          longitude: vertex[0],
          latitude: vertex[1],
        };
      });

      polyData.forEach((vertex) => {
        const request = pool.request();
        request.input('id', vertex.id)
          .input('polygonID', vertex.polygonID)
          .input('vertexIndex', vertex.vertexIndex)
          .input('longitude', vertex.longitude)
          .input('latitude', vertex.latitude)
          .query(
            `INSERT INTO Vertices (ID, PolygonID, VertexIndex, Longitude, Latitude) 
             VALUES (@id, @polygonID, @vertexIndex, @longitude, @latitude)`
          );
      });

      res.status(201).send({ message: 'Polygon inserted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/get', authenticateToken, async (req, res, next) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .query(
        `SELECT p.ID,p.Title,v.Longitude,v.Latitude FROM Polygons p
         Inner Join Vertices v
         ON p.ID = v.PolygonID
         ORDER BY Title, VertexIndex`
      );

    if (result.recordset.length === 0) {
      console.log('No polygons and vertices found.');
      return []; // Or handle the empty result set differently
    }
    const rows = result.recordset;
    const polygons = rows.reduce((acc, row) => {
      const { ID, Title, Longitude, Latitude } = row;
      const polygon = acc.find((p) => p.id === ID);
      if (!polygon) {
        acc.push({ id: ID, title:Title, coordinates: [[Longitude,  Latitude ]] });
      }
      else 
        polygon.coordinates.push([Longitude,  Latitude ]);
      return acc;
    }, []);

    res.status(200).send(polygons);
  } catch (error) {
    next(error);
  }
});

export default router;
