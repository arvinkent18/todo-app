import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import UserModule from '../src/user/user.module';
import User from '../src/user/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockCreateUser = {
    email: 'arvinkent121816@gmail.com',
    password: 'test-password',
    name: 'Arvin Kent Lazaga',
  }

  const mockUserRepository = {
    createUser: jest.fn().mockResolvedValue(mockCreateUser),
  };


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send(mockCreateUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual({
          email: mockCreateUser.email,
          password: mockCreateUser.password,
          name: mockCreateUser.name,
        })
      })
  });
});
