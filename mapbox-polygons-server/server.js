import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import polygonRoutes from './routes/polygons.js';
import mapBoxRoutes from './routes/mapBox.js';
import errorHandler from './middleware/errorHandler.js';
import  cors from "cors";
import { config } from 'dotenv';

config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/polygons', polygonRoutes);
app.use('/api/mapbox-style', mapBoxRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
