import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import UserService from 'src/user/user.service';
import UserRepository from 'src/user/user.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
