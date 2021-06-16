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
   * @param {int} userId  The user's ID
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async getUserById(userId: number): Promise<User> {
    return this.userRepository.getUserById(userId);
  }

  /**
   * @description Get a user information by Email
   * @param {string} email  The user's email
   * @public
   * @returns {Promise<User>} User Entity
   */
  public getUserByEmail(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }

  /**
   * @description Create a user
   * @param {CreateUserDto} userDetails  The user's details
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async createUser(userDetails: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(userDetails);
  }

  /**
   * @description Update a user's information
   * @param {int} userId  The user's ID
   * @param {UpdateUserDto} userDetails  The user's information
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async updateUser(
    userId: number,
    userDetails: UpdateUserDto,
  ): Promise<User> {
    return this.userRepository.updateUser(userId, userDetails);
  }

  /**
   * @description Delete a user
   * @param {int} userId  The user's ID
   * @public
   */
  public async deleteUser(userId: number): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}
