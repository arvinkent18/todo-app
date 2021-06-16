import { Injectable, InternalServerErrorException } from '@nestjs/common';
import CreateUserDto from '../user/dto/create-user.dto';
import UserService from '../user/user.service';
import User from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  /**
   * @description Register a user
   * @param {CreateUserDto} userDetails  The user's details   
   * @public 
   * @returns {Promise<User} User Entity
   */
  public async register(userDetails: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(userDetails);

    if (!user) {
      throw new InternalServerErrorException();
    }

    return user;
  }

  /**
   * @description Validate a user
   * @param {string} email  The user's email
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }
}
