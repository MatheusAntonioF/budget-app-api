import 'reflect-metadata';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  logging: true,

  entities: ['./dist/modules/**/infra/entities/*{.ts,.js}'],

  migrations: ['dist/shared/database/migrations/*.js'],

  cli: {
    entitiesDir: 'src/modules/**/infra/entities',
    migrationsDir: 'src/shared/database/migrations',
  },
};

export default dbConfig;
