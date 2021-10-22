import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './config/database';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UsersModule],
})
export class AppModule {}
