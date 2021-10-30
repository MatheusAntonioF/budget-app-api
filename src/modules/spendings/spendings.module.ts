import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './infra/http/controllers/CategoriesController';
import { SpendingsController } from './infra/http/controllers/SpendingsControllers';
import { Category } from './infra/typeorm/entities/Category';
import { Spendings } from './infra/typeorm/entities/Spendings';
import { CategoriesRepository } from './infra/typeorm/repositories/implementations/CategoriesRepository';
import { SpendingsRepository } from './infra/typeorm/repositories/implementations/SpendingsRepository';
import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';
import { CreateSpendingUseCase } from './useCases/CreateSpendingUseCase';
import { DeleteSpendingUseCase } from './useCases/DeleteSpendingUseCase';
import { GetAllCategoriesUseCase } from './useCases/GetAllCategoriesUseCase';
import { GetAllSpendingsUseCase } from './useCases/GetAllSpendingsUseCase';
import { GetCategoryUseCase } from './useCases/GetCategoryUseCase';
import { GetSpendingUseCase } from './useCases/GetSpendingUseCase';
import { UpdateSpendingUseCase } from './useCases/UpdateSpendingUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Spendings, Category])],
  controllers: [SpendingsController, CategoriesController],
  providers: [
    {
      provide: 'SpendingsRepository',
      useClass: SpendingsRepository,
    },
    {
      provide: 'CategoriesRepository',
      useClass: CategoriesRepository,
    },
    CreateSpendingUseCase,
    GetSpendingUseCase,
    GetAllSpendingsUseCase,
    DeleteSpendingUseCase,
    UpdateSpendingUseCase,
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoryUseCase,
  ],
})
export class SpendingsModule {}
