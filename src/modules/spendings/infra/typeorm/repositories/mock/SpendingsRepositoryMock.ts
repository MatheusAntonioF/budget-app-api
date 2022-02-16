import { generateUuidV4 } from '../../../../../../shared/helpers';
import { ICreateSpendingDTO } from '../../../../../spendings/dtos/ICreateSpendingDTO';
import { IUpdateSpendingDTO } from '../../../../../spendings/dtos/IUpdateSpendingDTO';
import { Spendings } from '../../entities/Spendings';
import { ISpendingsRepository } from '../ISpendingsRepository';

class SpendingsRepositoryMock implements ISpendingsRepository {
  private spendings: Spendings[] = [];

  async create(data: ICreateSpendingDTO): Promise<Spendings> {
    const spending = new Spendings();

    Object.assign(spending, { id: generateUuidV4(), ...data });

    this.spendings.push(spending);

    return spending;
  }
  async findById(id: string): Promise<Spendings> {
    const foundSpending = this.spendings.find((spending) => spending.id === id);

    return foundSpending;
  }
  async getAllSpendingsByUserId(user_id: string): Promise<Spendings[]> {
    const foundSpending = this.spendings.filter(
      (spending) => spending.user_id === user_id,
    );

    return foundSpending;
  }
  async delete(id: string): Promise<boolean> {
    const newSpendings = this.spendings.filter(
      (spending) => spending.id !== id,
    );

    this.spendings = newSpendings;

    return true;
  }
  async update(
    id: string,
    updateSpending: IUpdateSpendingDTO,
  ): Promise<boolean> {
    const foundSpending = this.spendings.find((spending) => spending.id === id);

    Object.assign(foundSpending, updateSpending);

    const updatedSpendings = this.spendings.map((spending) => {
      if (spending.id === id) return foundSpending;

      return spending;
    });

    this.spendings = updatedSpendings;

    return true;
  }
}

export { SpendingsRepositoryMock };
