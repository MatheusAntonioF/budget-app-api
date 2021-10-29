import { ICreateSpendingDTO } from '../../../dtos/ICreateSpendingDTO';
import { IUpdateSpendingDTO } from '../../../dtos/IUpdateSpendingDTO';
import { Spendings } from '../entities/Spendings';

interface ISpendingsRepository {
  create(data: ICreateSpendingDTO): Promise<Spendings>;
  findById(id: string): Promise<Spendings | null>;
  getAllSpendingsByUserId(user_id: string): Promise<Spendings[]>;
  delete(id: string): Promise<boolean>;
  update(id: string, updateSpending: IUpdateSpendingDTO): Promise<boolean>;
}

export { ISpendingsRepository };
