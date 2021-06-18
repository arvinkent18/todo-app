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
    ) { }

    public async getAllUsers(): Promise<User[]> {
      return this.userRepository.getAllUsers();
    }

    public async getUserById(userId: string): Promise<User> {
      return this.userRepository.getUserById(userId);
    }

   /**
    * Create a user
    * 
    * @param {CreateUserDto} userDetails  The user's details
    * @returns {Promise<User>} User Entity
    * @public
    */
    public async createUser(userDetails: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(userDetails);
    }
    
    /**
     * Update a user's information
     * 
     * @param userId  The user's ID
     * @param userDetails  The user's information
     * @returns {Promise<User>} User Entity
     * @public
     */
    public async updateUser(userId: string, userDetails: UpdateUserDto): Promise<User> {
        return this.userRepository.updateUser(userId, userDetails);
    }

    public async deleteUser(userId: string): Promise<User> {
      return this.userRepository.deleteUser(userId);
    }
}
