import { Inject, Injectable } from '@nestjs/common';

import { ICreateSpendingDTO } from '../dtos/ICreateSpendingDTO';
import { Spendings } from '../infra/typeorm/entities/Spendings';
import { ISpendingsRepository } from '../infra/typeorm/repositories/ISpendingsRepository';

@Injectable()
class CreateSpendingUseCase {
  constructor(
    @Inject('SpendingsRepository')
    private readonly spendingsRepository: ISpendingsRepository,
  ) {}

  async execute({
    name,
    description,
    date,
    value,
    user_id,
  }: ICreateSpendingDTO): Promise<Spendings> {
    const createdSpending = await this.spendingsRepository.create({
      name,
      description,
      date: new Date(date),
      value: Number(value),
      user_id,
    });

    return createdSpending;
  }
}

export { CreateSpendingUseCase };
