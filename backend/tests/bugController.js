const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Bug = require('../models/Bug');

describe('Bug API', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-bug-tracker-test';
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Bug.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let bugId;

  test('should create a bug', async () => {
    const res = await request(app).post('/api/bugs').send({ title: 'Test bug' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test bug');
    bugId = res.body._id;
  });

  test('should get all bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should update a bug status', async () => {
    const res = await request(app).put(/api/bugs/${bugId}).send({ status: 'resolved' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  test('should delete a bug', async () => {
    const res = await request(app).delete(/api/bugs/${bugId});
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
});