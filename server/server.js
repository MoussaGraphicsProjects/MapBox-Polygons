const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const polygonRoutes = require('./routes/polygons');
const mapBoxRoutes = require('./routes/mapBox');
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/polygons', polygonRoutes);
app.use('/mapbox-style', mapBoxRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});