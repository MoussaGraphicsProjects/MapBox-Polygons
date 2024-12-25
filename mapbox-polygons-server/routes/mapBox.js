import express from 'express';
import request  from 'request';
import authenticateToken from '../middleware/auth.js';
const router = express.Router();

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibW91c3NhZ3JhcGhpY3MiLCJhIjoiY200eTl3NTY3MHhrNjJtczhuM2RpeTVnYiJ9._3QUVKdPVLGezG3pAVtgzA';
const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12?access_token=${MAPBOX_ACCESS_TOKEN}`; // Include the token here!

if (!MAPBOX_ACCESS_TOKEN) {
    console.error('Error: MAPBOX_ACCESS_TOKEN is not set. Please set it in server.js.');
    process.exit(1); 
}

router.get('/getMap', authenticateToken, (req, res) => {
    request(
        {
            url: mapboxUrl,
            method: 'GET',
            json: true,
        },
        (error, response, body) => {
            if (error) {
                console.error('Error proxying Mapbox request:', error);
                return res.status(500).send({ error: 'Failed to fetch Mapbox style' });
            }

            if (response.statusCode !== 200) {
                console.error(`Mapbox returned status code: ${response.statusCode}`);
                return res.status(response.statusCode).send(body); // Forward the Mapbox error
            }

            res.send(body); // Send the Mapbox style data back to the client
        }
    );
});

export default router;
