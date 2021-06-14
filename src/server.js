const express = require('express');
const debug = require('debug')('server:debug');
require('dotenv').config();
const app = express();
const db = require('../db/config');
const userRouterV1 = require('./routes/users');

const SERVER_PORT = process.env.SERVER_PORT;
const HOST_NAME = process.env.HOST_NAME;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/', userRouterV1);

app.listen(SERVER_PORT, () => {
    debug('In Development Mode, starting debugger');
    console.log(`Clypeus listening at http://${HOST_NAME}:${SERVER_PORT}`);
});

module.exports = app;
