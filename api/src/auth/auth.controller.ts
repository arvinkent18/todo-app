import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import CreateUserDto from '../user/dto/create-user.dto';
import User from '../user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a user',
    tags: ['Authentication'],
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'User Registered successfully',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiBody({ type: CreateUserDto })
  public async signUp(@Body(ValidationPipe) userDetails: CreateUserDto): Promise<User> {
    return this.authService.register(userDetails);
  }
}
