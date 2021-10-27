import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

export { IUsersRepository };
