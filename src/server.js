const express = require('express');
const debug = require('debug')('server:debug');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.SERVER_PORT, () => {
    debug('In Development Mode, starting debugger');
    console.log(`Clypeus listening at http://localhost:${process.env.SERVER_PORT}`);
});