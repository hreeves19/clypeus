const express = require('express');
const debug = require('debug')('server:debug');
require('dotenv').config();
const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(SERVER_PORT, () => {
    debug('In Development Mode, starting debugger');
    console.log(`Clypeus listening at http://localhost:${SERVER_PORT}`);
});