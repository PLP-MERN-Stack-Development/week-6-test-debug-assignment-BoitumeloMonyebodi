const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Bug = require('../models/Bug');

// Use a separate test database
const MONGO_TEST_URI = process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/mern-bug-tracker-test';

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Bug.deleteMany();
});

describe('Bug API', () => {
  it('should create a bug', async () => {
    const res = await request(app).post('/api/bugs').send({
      title: 'Test bug',
      description: 'Bug description',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test bug');
  });

  it('should get all bugs', async () => {
    await Bug.create({ title: 'Bug 1' });
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a bug', async () => {
    const bug = await Bug.create({ title: 'Old Title' });
    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ title: 'Updated Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should delete a bug', async () => {
    const bug = await Bug.create({ title: 'To delete' });
    const res = await request(app).delete(`/api/bugs/${bug._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
});