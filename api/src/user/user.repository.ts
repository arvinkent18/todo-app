import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  /**
   * @description Get all users
   * @public
   * @returns {Promise<User[]} User Entity
   */
  public async getUsers(): Promise<User[]> {
    const users = await this.find({
      select: ['name', 'email', 'createdAt', 'updatedAt'],
      relations: ['tasks'],
    });

    return users;
  }

  /**
   * @description Get a user
   * @param {int} userId  The user's ID
   * @throws {NotFoundException}
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async getUserById(userId: number): Promise<User> {
    const user = this.findOneOrFail(userId, {
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      this.logger.error(`Failed to get user with ID ${userId}`);
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * @description Get a user information by Email
   * @param {string} email  The user's email
   * @public
   * @returns {Promise<User>} User Entity
   */
  public async getUserByEmail(email: string): Promise<User> {
    const user = this.findOne({ email });

    if (!user) {
      this.logger.error(`Failed to get user with email ${email}`);
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * @description Create a user
   * @param {CreateUserDto} userDetails  The user's details
   * @throws {ConflictException}
   * @throws {InternalServerErrorException}
   * @returns {Promise<User>} User Entity
   * @public
   */
  public async createUser(userDetails: CreateUserDto): Promise<User> {
    const { email, password, name } = userDetails;

    const user = this.create();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.name = name;

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      this.logger.verbose('successfully registered user');

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`${email} already exists`);
      } else {
        this.logger.error('Failed to create user', err.stack);
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * @description Update a user information
   * @param {int} userId  The user's ID
   * @param {UpdateUserDto} userDetails  The user's details
   * @throws {InternalServerErrorException}
   * @throws {NotFoundException}
   * @public
   * @returns {Promise<User>}  User Entity
   */
  public async updateUser(
    userId: number,
    userDetails: UpdateUserDto,
  ): Promise<User> {
    const { password, name } = userDetails;

    const user = await this.findOneOrFail(userId);

    if (user) {
      user.name = name;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);

      try {
        await user.save();
        delete user.password;

        return user;
      } catch (err) {
        throw new InternalServerErrorException();
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  /**
   * @description Delete a user
   * @param {int} userId  The user's ID
   * @throws {NotFoundException}
   * @throws {InternalServerErrorException}
   * @public
   */
  public async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    try {
      const softRemoveUser = await this.delete(user);

      if (softRemoveUser.affected === 0) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
    } catch (err) {
      this.logger.error('Failed to delete user', err.stack);
      throw new InternalServerErrorException();
    }
  }

  /**
   * @description Hash a password
   * @param {string} password  The user's password
   * @param {string} salt  The user's salt
   * @returns {Promise<string>} Hashed Password
   * @private
   */
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
