import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './user.entity';
import UserService from './user.service';

describe('SampleService', () => {
  let userService: UserService;

  const mockCreateUser = {
    email: 'arvinkent121816@gmail.com',
    password: 'test-password',
    name: 'Arvin Kent Lazaga',
  };

  const mockUpdateUser = {
    id: 1,
    password: 'test-password',
    name: 'Arvin Kent Lazaga',
  };

  const mockUserRepository = {
    createUser: jest.fn().mockResolvedValue(mockCreateUser),
    updateUser: jest.fn().mockResolvedValue(mockUpdateUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('it should create a user', async () => {
    expect(await userService.createUser(mockCreateUser)).toEqual({
      email: mockCreateUser.email,
      password: mockCreateUser.password,
      name: mockCreateUser.name,
    });
  });

  it('should update a user', async () => {
    expect(await userService.updateUser(1, mockUpdateUser)).toEqual({
      id: 1,
      password: mockUpdateUser.password,
      name: mockUpdateUser.name,
    });
  });
});
