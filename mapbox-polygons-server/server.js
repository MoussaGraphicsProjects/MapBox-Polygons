const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const polygonRoutes = require('./routes/polygons');
const mapBoxRoutes = require('./routes/mapBox');
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");
require('dotenv').config();

const createDatabaseAndTable = require('./middleware/dbCreator');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/polygons', polygonRoutes);
app.use('/api/mapbox-style', mapBoxRoutes);
app.use(errorHandler);

createDatabaseAndTable();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
