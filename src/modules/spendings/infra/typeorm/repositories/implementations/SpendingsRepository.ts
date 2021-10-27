import { Spendings } from '../../entities/Spendings';
import { ISpendingsRepository } from '../ISpendingsRepository';

import { ICreateSpendingDTO } from 'src/modules/spendings/dtos/ICreateSpendingDTO';
import { IUpdateSpendingDTO } from 'src/modules/spendings/dtos/IUpdateSpendingDTO';
import { getRepository } from 'typeorm';

class SpendingsRepository implements ISpendingsRepository {
  async getAllSpendingsByUserId(user_id: string): Promise<Spendings[]> {
    const spendingsRepository = getRepository(Spendings);

    const allSpendingsByUserId = await spendingsRepository.find({
      where: { user_id },
    });

    return allSpendingsByUserId;
  }

  async findById(id: string): Promise<Spendings> {
    const spendingsRepository = getRepository(Spendings);

    const foundSpending = await spendingsRepository.findOne(id);

    return foundSpending;
  }
  async create({
    name,
    description,
    date,
    value,
    user_id,
  }: ICreateSpendingDTO): Promise<Spendings> {
    const spendingsRepository = getRepository(Spendings);

    const spending = spendingsRepository.create({
      name,
      description,
      date,
      value,
      user_id,
    });

    const createdSpending = await spendingsRepository.save(spending);

    return createdSpending;
  }

  async update(
    id: string,
    updateSpending: IUpdateSpendingDTO,
  ): Promise<boolean> {
    const spendingsRepository = getRepository(Spendings);

    const updatedSpending = await spendingsRepository.update(
      id,
      updateSpending,
    );

    return !!updatedSpending.raw;
  }

  async delete(id: string): Promise<boolean> {
    const spendingsRepository = getRepository(Spendings);

    const deletedSpending = await spendingsRepository.delete(id);

    return !!deletedSpending;
  }
}

export { SpendingsRepository };
