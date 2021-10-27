import { Inject, Injectable } from '@nestjs/common';

import { Spendings } from '../infra/typeorm/entities/Spendings';
import { ISpendingsRepository } from '../infra/typeorm/repositories/ISpendingsRepository';

@Injectable()
class GetAllSpendingsUseCase {
  constructor(
    @Inject('SpendingsRepository')
    private readonly spendingsRepositoryu: ISpendingsRepository,
  ) {}

  async execute(user_id: string): Promise<Spendings[]> {
    const allSpendings =
      await this.spendingsRepositoryu.getAllSpendingsByUserId(user_id);

    return allSpendings;
  }
}

export { GetAllSpendingsUseCase };
