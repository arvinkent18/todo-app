import { Test, TestingModule } from '@nestjs/testing';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import UserController from './user.controller';
import UserService from './user.service';

describe('UserController', () => {
  let userController: UserController;

  const mockUserService = {
    createUser: jest.fn((dto: CreateUserDto) => {
      return { 
        ...dto 
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
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('it should create a user', async () => {
    const userDto: CreateUserDto = {
      email: 'arvinkent121816@gmail.com',
      password: 'test-password',
      name: 'Arvin Kent Lazaga',
    };
    expect(await userController.createUser(userDto))
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
    expect(await userController.updateUser("1", userDto))
      .toEqual({
        id: "1",
        password: userDto.password,
        name: userDto.name,
      })
  })
});
