import { Test, TestingModule } from '@nestjs/testing';
import CreateUserDto from './dto/create-user.dto';
import UserRepository from "./user.repository";

describe('UserRepository', () => {
  let userRepository: UserRepository;

  const mockUserRepository = {
    createUser: jest.fn(CreateUserDto => {
      return {
        ...CreateUserDto,
      }    
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserRepository)
      .compile();

      userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should create a user', () => {
    const userDto: CreateUserDto = {
      email: 'arvinkent121816@gmail.com',
      password: 'test-password',
      name: 'Arvin Kent Lazaga', 
    };
    expect(userRepository.createUser(userDto)).toEqual({
      email: userDto.email,
      password: userDto.password,
      name: userDto.name,
    })
  });

});