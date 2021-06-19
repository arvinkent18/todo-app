import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.entity';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  private logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  /**
   * @description Get list of users
   * @public
   * @returns {Promise<User[]>} User Entity
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    tags: ['User'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully get all users',
  })
  public async getUsers(): Promise<User[]> {
    this.logger.verbose(`Getting all users`);

    return this.userService.getUsers();
  }

  /**
   * @description Get user details
   * @param {int} userId  The user's ID
   * @public
   * @returns {Promise<User>} User Entity
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user',
    tags: ['User'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully get user',
  })
  @ApiParam({ name: 'id', required: true })
  public async getUserById(@Param('id') userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }

  /**
   * @description Create a user
   * @param {CreateUserDto} userDetails  The user's details
   * @public
   * @returns {Promise<User>} User Entity
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a user',
    tags: ['User'],
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Successfully created a User',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiConflictResponse({
    status: 23505,
    description: 'User already exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  public async createUser(
    @Body(ValidationPipe) userDetails: CreateUserDto,
  ): Promise<User> {
    this.logger.verbose('User created successfully');

    return this.userService.createUser(userDetails);
  }

  /**
   * @description Update a user's information
   * @param {int} userId  The user's ID
   * @param {string} userDetails  The user's information
   * @public
   * @returns {Promise<User>} User Entity
   */
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update a user',
    tags: ['User'],
  })
  @ApiNoContentResponse({
    status: 204,
    description: 'User Updated Successfully',
  })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: UpdateUserDto })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  public async updateUser(
    @Param('id') userId: number,
    @Body(ValidationPipe) userDetails: UpdateUserDto,
  ): Promise<User> {
    this.logger.verbose(`Updated user with ID ${userId}`);

    return this.userService.updateUser(userId, userDetails);
  }

  /**
   * @description Delete a user
   * @param {string} userId  The user's ID
   * @public
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a user',
    tags: ['User'],
  })
  @ApiNoContentResponse({
    status: 204,
    description: 'User Deleted Successfully',
  })
  public async deleteUser(@Param('id') userId: number): Promise<void> {
    this.logger.verbose(`Deleted user with ID ${userId}`);

    return this.userService.deleteUser(userId);
  }
}
