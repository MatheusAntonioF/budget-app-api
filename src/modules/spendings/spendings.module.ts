import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpendingsController } from './infra/http/controllers/SpendingsControllers';
import { Spendings } from './infra/typeorm/entities/Spendings';
import { SpendingsRepository } from './infra/typeorm/repositories/implementations/SpendingsRepository';
import { CreateSpendingUseCase } from './useCases/CreateSpendingUseCase';
import { DeleteSpendingUseCase } from './useCases/DeleteSpendingUseCase';
import { GetAllSpendingsUseCase } from './useCases/GetAllSpendingsUseCase';
import { GetSpendingUseCase } from './useCases/GetSpendingUseCase';
import { UpdateSpendingUseCase } from './useCases/UpdateSpendingUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Spendings])],
  controllers: [SpendingsController],
  providers: [
    {
      provide: 'SpendingsRepository',
      useClass: SpendingsRepository,
    },
    CreateSpendingUseCase,
    GetSpendingUseCase,
    GetAllSpendingsUseCase,
    DeleteSpendingUseCase,
    UpdateSpendingUseCase,
  ],
})
export class SpendingsModule {}
