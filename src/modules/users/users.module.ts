import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './infra/http/controllers/UsersController';
import { User } from './infra/typeorm/entities/User';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { DeleteUserUseCase } from './useCases/DeleteUserUseCase';
import { GetUserUseCase } from './useCases/GetUserUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    CreateUserUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
