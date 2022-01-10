import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HashProvider } from '../../shared/providers/HashProvider';
import { UsersController } from './infra/http/controllers/UsersController';
import { User } from './infra/typeorm/entities/User';
import { UsersRepository } from './infra/typeorm/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { DeleteUserUseCase } from './useCases/DeleteUserUseCase';
import { GetUserUseCase } from './useCases/GetUserUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
    CreateUserUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
    HashProvider,
  ],
  exports: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
