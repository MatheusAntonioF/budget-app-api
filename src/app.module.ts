import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import dbConfig from './config/database';
import { UsersModule } from './modules/users/users.module';

const customConnectionDB = { ...dbConfig, host: 'budget_db' };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...customConnectionDB,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
