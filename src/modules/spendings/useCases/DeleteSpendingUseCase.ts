import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ISpendingsRepository } from '../infra/typeorm/repositories/ISpendingsRepository';

@Injectable()
class DeleteSpendingUseCase {
  constructor(
    @Inject('SpendingsRepository')
    private readonly spendingsRepository: ISpendingsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existsSpending = await this.spendingsRepository.findById(id);

    if (!existsSpending)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);

    await this.spendingsRepository.delete(id);
  }
}

export { DeleteSpendingUseCase };
