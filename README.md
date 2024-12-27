VOIS Mapbox Polygons Task by Mohamed Moussa.

The project contains React (Typescript), Node.js (V. 18), (Javascript) and MSSQL.

React is compiled and hosted by Vite. Node.js uses express as an application server and router.

To run from local machine please pull the repo and use "npm start" to run express server then "npm run dev" to run vite.
First please check a running MSSQL server instance and modify ".env" file in "mapbox-polygons-server" to match your MSSQL credentials.

To deploy the project on Docker please run the following command on a fresh installation of Docker.

docker-compose up -d

If there is an instance installed and may have services using these ports: 1433, 3000 and 5173 please modify Docker-compose.yml file.
Also modify client/src/config.ts apiUrl value with modified port.

Docker compose shall deploy images for MSSQL, Server (Node.js and required modules) and Client (React, Node.js and required modules) then create running containers.

The deployment is adjusted for development.

Once the deployment finishes successfully you could be able to open the React client using: http://localhost:5173/.

Client depends on Server depends on MSSQL so starting order should be MSSQL->Node.js->React. Docker compose handles this just in case of manually starting.

Once the Node.js Express server starts and run "server.js" script it checks the MSSQL DB and creates it if not exists.

A login screen will appear. please click Register and create a new user login.

Login with the created user you will access the map page.

To create a polygon click Start Polygon button then click on the map on points of the polygon (You will not see the polygon until click End polygon).
#Further enhancements is showing the polygon with clicks.

Once the polygon is created it is inserted in the DB and added to the select box on top left of the map.

each time you login the polygons are loaded from DB to the select box. Select one it should be rendered as an overlay of the map using DeckGL.

All global states are managed by Redux.

Routes are protected by JWT token.
