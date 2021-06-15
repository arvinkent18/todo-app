import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * @description Get all users
   * @public
   * @returns {Promise<User[]>} User Entity
   */
  public async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
  
  /**
   * @description Get a user
   * @param userId  The user's ID
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async getUserById(userId: number): Promise<User> {
    return this.userRepository.getUserById(userId);
  }

  /**
   * @description Create a user
   * @param {CreateUserDto} userDetails  The user's details
   * @returns {Promise<User>} User Entity
   * @public
   */
  public async createUser(userDetails: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(userDetails);
  }

  /**
   * @description Update a user's information
   * @param userId  The user's ID
   * @param userDetails  The user's information
   * @returns {Promise<User>} User Entity
   * @public
   */
  public async updateUser(
    userId: number,
    userDetails: UpdateUserDto,
  ): Promise<User> {
    return this.userRepository.updateUser(userId, userDetails);
  }

  /**
   * @description Delete a user
   * @param userId  The user's ID
   * @public
   */
  public async deleteUser(userId: number): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}
