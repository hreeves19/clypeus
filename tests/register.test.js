require('dotenv').config();
const expect = require('chai').expect;
const request = require('supertest');
const moment = require('moment');
const User = require('../db/models/User');
let server = require('../src/server');

describe('API Register', ()=> {
    let newUsers = [];

    function getFakeUser() {
        return {
            firstname: 'John',
            lastname: 'Doe',
            email: getNewEmail(),
            password: `test123`
        };
    }

    function getNewEmail() {
        return `john.${moment().unix()}@email.com`;
    }

    describe('POST /api/register/', () => {

        it('should save a new user to the database', async () => {
            const user = getFakeUser();

            const response = await request(server).post('/api/register/').send(user);
            newUsers.push(await User.findOne({ email: user.email }));
            const savedUser = newUsers[newUsers.length - 1];

            expect(savedUser, 'Could not find user in database').to.be.an('object');
            expect(response.status, 'An error was thrown somewhere').to.equal(200);
        });

        [
            { firstname: 'John', lastname: 'Doe', email: getNewEmail() },
            { firstname: 'John', lastname: 'Doe', password: 'somePassword' },
            { firstname: 'John', email: getNewEmail(), password: 'somePassword' },
            { lastname: 'Doe', email: getNewEmail(), password: 'somePassword' },
            {},
            undefined,
            null
        ].forEach((user) => {
            it('should respond with error when user is missing required data', async () => {
                const response = await request(server).post('/api/register/').send(user);

                expect(response.status, 'An internal server error should have been thrown').to.equal(500);
            });
        });

        it('should respond with error when user tries to signup with a duplicate email', async () => {
            let newUser = getFakeUser();

            const responseWithNewUser = await request(server).post('/api/register/').send(newUser);
            const responseWithFakeUser = await request(server).post('/api/register/').send(newUser);
            let users = await User.find({ email: newUser.email });
            newUsers = newUsers.concat(newUsers, users);

            expect(responseWithNewUser.status, 'This should have responded with status 200, user should have been added to database').to.equal(200);
            expect(responseWithFakeUser.status, 'An internal server error should have been thrown').to.equal(500);
            expect(users.length).to.equal(1, `Should only have one user with this email: ${newUser.email}`);
        });
    });

    afterEach(async () => {
        for (const user of newUsers) {
            try {
                await User.deleteOne({ _id: user._id });
            } catch (error) {
                console.error(error);
                // TODO: LOG ERROR
            }
        }
    });
});