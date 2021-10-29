import { User } from '../entities/User';

import { ICreateUserDTO } from 'src/modules/users/dtos/CreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

export { IUsersRepository };
