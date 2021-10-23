import 'reflect-metadata';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  host: process.env.DATABASE_HOST,
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'budget_app_db',

  synchronize: true,

  entities: ['dist/modules/**/infra/typeorm/entities/User{.ts,.js}'],

  migrations: ['dist/shared/database/migrations/*.js'],

  cli: {
    entitiesDir: 'src/modules/**/infra/typeorm/entities',
    migrationsDir: 'src/shared/database/migrations',
  },
};

export default dbConfig;
