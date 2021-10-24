import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spendings } from './infra/typeorm/entities/Spendings';

@Module({
  imports: [TypeOrmModule.forFeature([Spendings])],
})
export class SpendingsModule {}
