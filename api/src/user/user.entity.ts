import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt?: Date;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}