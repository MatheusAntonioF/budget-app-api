import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  host: 'budget_db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'budget_app_db',

  entities: ['./dist/**/*.entity.js'],

  migrations: ['dist/shared/database/migrations/*.js'],

  cli: {
    migrationsDir: 'src/shared/database/migrations',
  },
};

export default dbConfig;
