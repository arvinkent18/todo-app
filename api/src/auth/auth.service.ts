import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from 'src/user/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import CreateUserDto from '../user/dto/create-user.dto';
import User from '../user/user.entity';
import AuthCredentialsDto from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * @description Sign Up a user
   * @param {CreateUserDto} userDetails  The user's details
   * @public
   * @returns {Promise<User} User Entity
   */
  public async signUp(userDetails: CreateUserDto): Promise<User> {
    const user = await this.userRepository.createUser(userDetails);

    if (!user) {
      throw new InternalServerErrorException();
    }

    this.logger.verbose('User successfully sign up');

    return user;
  }

  /**
   * @description Validate the user's credential
   * @param {AuthCredentialsDto} authCredentialsDto  The user's credentials
   * @public
   * @returns {Promise<{accessToken}>} Access Token
   */
  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUser(authCredentialsDto);

    if (email) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }

    return undefined;
  }
}
