import { Module } from '@nestjs/common';
import { UsersController } from './infra/http/controllers/UsersController';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
