
require('dotenv').config();
const expect = require('chai').expect;
const request = require('supertest');
let server = require('../src/server');

describe('API User V1', ()=> {
    describe('GET /api/v1/users/', () => {
        it('should return an array of users', async () => {
            const response = await request(server).get('/api/v1/users/');
    
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an.instanceOf(Array);
        });
    });
});