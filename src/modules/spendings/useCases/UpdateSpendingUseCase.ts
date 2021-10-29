import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUpdateSpendingDTO } from '../dtos/IUpdateSpendingDTO';
import { Spendings } from '../infra/typeorm/entities/Spendings';
import { ISpendingsRepository } from '../infra/typeorm/repositories/ISpendingsRepository';

@Injectable()
class UpdateSpendingUseCase {
  constructor(
    @Inject('SpendingsRepository')
    private readonly spendingsRepository: ISpendingsRepository,
  ) {}

  async execute(
    id: string,
    updateSpending: IUpdateSpendingDTO,
  ): Promise<Spendings> {
    const existsSpending = await this.spendingsRepository.findById(id);

    if (!existsSpending)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);

    const serializeDataToUpdate = {} as IUpdateSpendingDTO;

    Object.entries(updateSpending).map(([key, value]) => {
      if (!!value) serializeDataToUpdate[key] = value;
    });

    await this.spendingsRepository.update(id, serializeDataToUpdate);

    const updatedSpending = Object.assign(
      existsSpending,
      serializeDataToUpdate,
    );

    return updatedSpending;
  }
}

export { UpdateSpendingUseCase };
