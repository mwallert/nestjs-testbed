import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameUserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GameUserRepository
    ])
  ],
  controllers: [UserController]
})
export class UserModule {}
