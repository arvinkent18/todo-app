import { ApiProperty } from "@nestjs/swagger";
import User from "src/user/user.entity";
import { BaseEntity, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class Task extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt?: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date;
  }

  @ManyToOne(
    type => User, 
    user => user.tasks, 
    { eager: false },
  )
  user: User;
}
