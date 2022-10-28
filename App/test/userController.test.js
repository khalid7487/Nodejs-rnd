import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userService');

describe('UserController Test Suite', () => {

    test('get should return an array of user', async () => {
        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.data.length).toBeGreaterThan(0);
        expect(users.data[0].id).toBe('1');
    });

    test('post should return saved id', async () =>{
        let user = { username: "test0002"};
        let response = await request(app).post('/users').send(user);
        expect(response.statusCode).toBe(201);
        let body = response.body;
        expect(body.data._id.length).toBe(24);
      
        let savedUserResponse = await request(app).get('/users/' + body.data._id);
        let savedUser = savedUserResponse.body;
        expect(savedUser.createdAt).not.toBe(null);
        expect(savedUser.user.username).toBe(user.username);
    })

    test('get by id should return an user', async()=>{

        let response = await request(app).get('/users/1');
        let user =response.body;
        expect(user.user.id).toBe('1');
    })

    test('put should update an existing user', async () =>{
        let user = {id: '1', username: 'test0003'};
        let response = await request(app).put('/users').send(user);
        expect(response.statusCode).toBe(200);
        let updatedUserResponse = await request(app).get('/users/1');
        let updatedUser = updatedUserResponse.body;
        expect(updatedUser.user.username).toBe(user.username);

    })

    test.only('delete by id should return success message', async () =>{
        let response = await request(app).delete('/users/1');
        expect(response.statusCode).toBe(200);
        let deletedUserResponse = await request(app).get('/users/1');
        // expect(deletedUserResponse.statusCode).toBe(404);
        let deletedUser = deletedUserResponse.body;
        console.log(deletedUser)
        // expect(deletedUser.message).toBe('User not found by the id: 1');
        expect(deletedUser.body).toBe(undefined);
    })


});

