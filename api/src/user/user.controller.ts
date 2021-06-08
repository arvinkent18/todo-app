import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import CreateUserDto from './dto/create-user.dto';
import UserService from './user.service';

@Controller('user')
export default class UserController {
    constructor(private readonly userService: UserService) {}

  /**
   * Create a user
   *
   * @body {CreateUserDto} userDetails  The user's details
   * @returns {Promise<User>} User Entity
   * @public
   */
    @Post('register')
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
    public async createUser(@Body(ValidationPipe) userDetails: CreateUserDto) {
      return this.userService.createUser(userDetails);
    }
}
