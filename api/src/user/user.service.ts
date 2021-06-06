import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from './dto/create-user.dto';
import User from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

 /**
   * Create a user
   * @param {CreateUserDto} userDetails  The user's details
   * @returns {Promise<User>} User Entity
   * @public
   */
    public async createUser(userDetails: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(userDetails);
    }
}
