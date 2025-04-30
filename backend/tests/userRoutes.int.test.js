const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); 
const UserModel = require('../models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await UserModel.deleteMany();
});

describe('Integration Test - User Registration', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/userAF/register') // Update path to match your actual route
      .send({
        email: 'testuser@example.com',
        password: 'test1234',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');

    const userInDb = await UserModel.findOne({ email: 'testuser@example.com' });
    expect(userInDb).not.toBeNull();
    expect(userInDb.password).not.toBe('test1234'); // Password should be hashed
  });

  it('should not register if email already exists', async () => {
    await UserModel.create({
      email: 'existing@example.com',
      password: 'hashedPassword',
    });

    const res = await request(app)
      .post('/userAF/register')
      .send({
        email: 'existing@example.com',
        password: 'any1234',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should return 400 for invalid email or short password', async () => {
    const res = await request(app)
      .post('/userAF/register')
      .send({
        email: 'notanemail',
        password: '123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
