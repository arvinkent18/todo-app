import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import CreateUserDto from "./dto/create-user.dto";
import User from "./user.entity";
import * as bcrypt from 'bcrypt'

export default class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');

    /**
   * Create a user
   * @param {CreateUserDto} userDetails  The user's details
   * @throws {ConflictException}
   * @throws {InternalServerErrorException}
   * @returns {Promise<User>} User Entity
   * @public
   */
    public async createUser(userDetails: CreateUserDto): Promise<User> {
        const {
            email,
            password,
            name,
        } = userDetails;

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
                throw new InternalServerErrorException();
            }
        }
    }

    /**
     * Hash password
     * @param {string} password  The user's password
     * @param {string} salt  The user's salt
     * @returns {Promise<string>} Hashed Password
     * @private
     */
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}