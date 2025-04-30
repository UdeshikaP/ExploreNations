const request = require('supertest');
const express = require('express');
const userRouter = require('../routes/userRoutes');
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
jest.mock('../models/User');
jest.mock('../middleware/auth');
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/userAF', userRouter);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'testsecret';
    process.env.JWT_EXPIRES_IN = '1h';
  });

  // ------------------ Register ------------------
  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
        // Mock no existing user
        UserModel.findOne.mockResolvedValue(null);
      
        // Mock password hashing
        bcrypt.genSalt = jest.fn().mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword');
      
        // Mock save
        UserModel.prototype.save = jest.fn().mockResolvedValue({
          email: 'piumi@gmail.com',
          password: 'hashedPassword'
        });
      
        const res = await request(app)
          .post('/userAF/register')
          .send({ email: 'piumi@gmail.com', password: '1234' });
      
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ message: 'User registered successfully' });
      });
      
      
    it('should return 400 if user already exists', async () => {
      UserModel.findOne.mockResolvedValue({ email: 'piumi@gmail.com' });

      const res = await request(app)
        .post('/userAF/register')
        .send({ email: 'piumi@gmail.com', password: '1234' });

      
    });
  });

  // ------------------ Login ------------------
  describe('POST /login', () => {
    it('should login successfully', async () => {
      UserModel.findOne.mockResolvedValue({ email: 'user@gmail.com', password: 'hashedPassword', id: '1' });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fakeToken');

      const res = await request(app)
        .post('/userAF/login')
        .send({ email: 'user@gmail.com', password: '1234' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Token generated successfully', token: 'fakeToken' });
    });

    it('should return 400 for invalid credentials', async () => {
      UserModel.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/userAF/login')
        .send({ email: 'user@gmail.com', password: '1234' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: 'Invalid credentials' });
    });
  });
 
});
