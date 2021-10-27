import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './infra/entities/User';
import { UsersController } from './infra/http/controllers/UsersController';
import { UsersRepository } from './infra/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { DeleteUserUseCase } from './useCases/DeleteUserUseCase';
import { GetUserUseCase } from './useCases/GetUserUseCase';

import { HashProvider } from 'src/shared/providers/HashProvider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    CreateUserUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
    HashProvider,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
