import http from 'http';

import app from './app.js';
import { mongoConnect } from './services/mongo.js'; 

const PORT = 5000;

const server = http.createServer(app);

await mongoConnect();

server.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}...`);
})