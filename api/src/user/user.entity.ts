import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

import * as bcrypt from 'bcrypt';

@Unique(['email'])
@Entity()
export default class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column()
    salt: string;

    @Column({ type: 'timestamp' })
    @CreateDateColumn()
    public dateCreated?: Date;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}