import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import Task from '../task/task.entity';

@Unique(['email'])
@Entity()
export default class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
