const expect = require('chai').expect;
require('dotenv').config();
let server = require('../src/server');

describe('Server', ()=> {
    beforeEach(() => {
        server.SERVER_PORT = process.env.SERVER_PORT;
    });

    it('should run server on port defined in .env', async() => {
        expect(server.SERVER_PORT).to.equal(process.env.SERVER_PORT);
    })
});