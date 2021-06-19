import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import CreateUserDto from '../user/dto/create-user.dto';
import User from '../user/user.entity';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  /**
   * @description Sign up a user
   * @param {CreateUserDto}  userDetails  The user's details
   * @public
   * @returns {Promise<User} User Entity
   */
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
  public async signUp(
    @Body(ValidationPipe) userDetails: CreateUserDto,
  ): Promise<User> {
    this.logger.verbose('User Sign-up successfully');

    return this.authService.signUp(userDetails);
  }

  /**
   * @description Validate the user's credential
   * @param {AuthCredentialsDto} authCredentialsDto  The user's credentials
   * @public
   * @returns {Promise<{accessToken}>} Access Token
   */
  @Post('/sign-in')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Sign in a user',
    tags: ['Authentication'],
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'User Sign-in Successfully',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized User',
  })
  @ApiBody({ type: AuthCredentialsDto })
  public async signIn(
    @Body(ValidationPipe) authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }
}
