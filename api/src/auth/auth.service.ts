import {
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from 'src/user/user.repository';
import CreateUserDto from '../user/dto/create-user.dto';
import User from '../user/user.entity';
import AuthCredentialsDto from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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
   * @returns {Promise<string>} Email
   */
  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.validateUser(authCredentialsDto);
  }

  /**
   * @description Validate a user
   * @param {string} email  The user's email
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);

    if (user && user.password === password) {
      this.logger.verbose('User successfully sign in');

      return user;
    }

    return null;
  }
}
