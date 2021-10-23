import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import dbConfig from './config/database';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
