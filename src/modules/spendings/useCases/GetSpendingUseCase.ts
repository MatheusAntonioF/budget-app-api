import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Spendings } from '../infra/typeorm/entities/Spendings';
import { ISpendingsRepository } from '../infra/typeorm/repositories/ISpendingsRepository';

@Injectable()
class GetSpendingUseCase {
  constructor(
    @Inject('SpendingsRepository')
    private readonly spendingsRepository: ISpendingsRepository,
  ) {}

  async execute(id: string): Promise<Spendings | null> {
    const foundSpending = await this.spendingsRepository.findById(id);

    if (!foundSpending)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);

    return foundSpending;
  }
}

export { GetSpendingUseCase };
