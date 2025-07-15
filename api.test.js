const request = require('supertest');
const app = require('../src/app'); // Replace with your actual Express app path

describe('API Endpoints Testing', () => {
  
  // Test GET /users
  it('should fetch all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Assuming the response is an array
    expect(res.body.length).toBeGreaterThan(0); // Ensure there are some users
  });

  // Test POST /users
  it('should create a new user', async () => {
    const newUser = {
      name: 'Jane Doe',
      email: 'jane@example.com'
    };
    const res = await request(app).post('/users').send(newUser);
    expect(res.status).toBe(201); // Check that the status is 'Created'
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.email).toBe(newUser.email);
  });

  // Test PUT /users/:id
  it('should update a user by ID', async () => {
    const userId = 1;  // Assuming user ID 1 exists
    const updatedUser = {
      name: 'Jane Updated',
      email: 'janeupdated@example.com'
    };
    const res = await request(app).put(`/users/${userId}`).send(updatedUser);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedUser.name);
    expect(res.body.email).toBe(updatedUser.email);
  });

  // Test DELETE /users/:id
  it('should delete a user by ID', async () => {
    const userId = 1; // Assuming user ID 1 exists
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.status).toBe(200);  // Ensure the delete status is OK
    expect(res.body.message).toBe('User deleted'); // Assuming your response has a message like this
  });

  // Test Invalid Route (404)
  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.status).toBe(404);  // Ensure a 404 status is returned for non-existent routes
  });
});
