import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userService');

describe('UserController Test Suite', () => {

    test('get should return an array of user', async () => {
        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.data.length).toBeGreaterThan(0);
        expect(users.data[0]._id).toBe('1');
    });

    test('post should return saved id', async () =>{
        let user = { username: "test0002"};
        let response = await request(app).post('/users').send(user);
        expect(response.statusCode).toBe(201);
        let body = response.body;
        expect(body.data._id.length).toBe(24);  
    })


});

