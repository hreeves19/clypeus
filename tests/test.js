const expect = require('chai').expect;
require('dotenv').config();
let server = require('../src/server');

describe('Server', ()=> {
    let serverPort = undefined;

    beforeEach(() => {
        serverPort = process.env.SERVER_PORT;
    });

    it('should run server on port defined in .env', async() => {
        expect(serverPort).to.equal(process.env.SERVER_PORT);
    })
});