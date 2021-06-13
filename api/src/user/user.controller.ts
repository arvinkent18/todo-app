import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.entity';
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
    public async createUser(@Body(ValidationPipe) userDetails: CreateUserDto): Promise<User> {
      return this.userService.createUser(userDetails);
    }
    
    /**
     * Update a user's information
     * 
     * @param userId  The user's ID
     * @param userDetails  The user's information
     * @returns {Promise<User>} User Entity 
     * @public
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
    public async updateUser(@Param('id') userId: string, @Body(ValidationPipe) userDetails: UpdateUserDto): Promise<User> {
      return this.userService.updateUser(userId, userDetails);
    }
}
