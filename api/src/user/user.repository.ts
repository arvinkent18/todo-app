import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import CreateUserDto from "./dto/create-user.dto";
import User from "./user.entity";
import UpdateUserDto from "./dto/update-user.dto";


@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');

  /**
    * Create a user
    * 
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
     * Update a user information
     * 
     * @param userId  The user's ID
     * @param userDetails  The user's details
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     * @returns {Promise<User>} User Entity
     * @public
     */
    public async updateUser(userId: string, userDetails: UpdateUserDto): Promise<User> {
        const {
            password,
            name,
        } = userDetails;
        
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
     * Hash password
     * 
     * @param {string} password  The user's password
     * @param {string} salt  The user's salt
     * @returns {Promise<string>} Hashed Password
     * @private
     */
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}