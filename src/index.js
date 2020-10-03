const express = require('express');
const redirect = require('express-redirect');
const http = require('http');
const {routes} = require('./routes/routes');

const router = express.Router();
const app = express();
const port = 3000;
redirect(app);

const server = http.createServer(app);

app.use(router);

server.listen(port, () => {
    const serverHost = server.address().address;
    const serverPort = server.address().port;
    console.log('Server listening at http://%s:%s', serverHost, serverPort);
});

// adding routes per service
routes(app);

