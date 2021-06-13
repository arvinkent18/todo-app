import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.entity';
import UserService from './user.service';

describe('SampleService', () => {
  let userService: UserService;

  const mockUserRepository = {
    createUser: jest.fn((dto: CreateUserDto) => {
      return {
        ...dto,
      }
    }),
    updateUser: jest.fn((id: string, dto: UpdateUserDto) => {
      return {
        id,
        ...dto,
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, 
      {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository,
      }],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('it should create a user', async () => {
    const userDto: CreateUserDto = {
      email: 'arvinkent121816@gmail.com',
      password: 'test-password',
      name: 'Arvin Kent Lazaga',
    };
    expect(await userService.createUser(userDto))
      .toEqual({
        email: userDto.email,
        password: userDto.password,
        name: userDto.name,
      })
  });

  it('should update a user', async () => {
    const userDto: UpdateUserDto = {
      password: 'test-password',
      name: 'Arvin Kent Lazaga',
    };
    expect(await userService.updateUser("1", userDto))
      .toEqual({
        id: "1",
        password: userDto.password,
        name: userDto.name,
      })
  })
});
