import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ICreateSpendingDTO } from '../dtos/ICreateSpendingDTO';
import { Spendings } from '../infra/typeorm/entities/Spendings';
import { ICategoriesRepository } from '../infra/typeorm/repositories/ICategoriesRepository';
import { ISpendingsRepository } from '../infra/typeorm/repositories/ISpendingsRepository';

@Injectable()
class CreateSpendingUseCase {
  constructor(
    @Inject('SpendingsRepository')
    private readonly spendingsRepository: ISpendingsRepository,
    @Inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
    description,
    date,
    value,
    user_id,
    category_id,
  }: ICreateSpendingDTO): Promise<Spendings> {
    const existsCategory = await this.categoriesRepository.findById(
      category_id,
    );

    if (!existsCategory)
      throw new HttpException('Category Not Found', HttpStatus.BAD_REQUEST);

    const createdSpending = await this.spendingsRepository.create({
      name,
      description,
      date: new Date(date),
      value: Number(value),
      user_id,
      category_id,
    });

    return createdSpending;
  }
}

export { CreateSpendingUseCase };
