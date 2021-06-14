const expect = require('chai').expect;
require('dotenv').config();
let server = require('../src/server');

describe('Server', ()=> {
    beforeEach(() => {
        server.SERVER_PORT = process.env.SERVER_PORT;
        server.HOST_NAME = process.env.HOST_NAME;
    });

    it('should run server on port defined in .env', async() => {
        expect(server.SERVER_PORT).to.equal(process.env.SERVER_PORT);
    });

    it('should run server on host name defined in .env', async() => {
        expect(server.HOST_NAME).to.be.a('string');
        expect(server.HOST_NAME.length).to.be.greaterThan(0, 'The host name is not defined in .env file');
        expect(server.HOST_NAME).to.equal(process.env.HOST_NAME);
    });

    it('should be defined as a number and greater than 0 for server port', () => {
        const port = +server.SERVER_PORT;

        expect(port).to.be.finite;
        expect(port).to.be.greaterThan(0);
    });
});