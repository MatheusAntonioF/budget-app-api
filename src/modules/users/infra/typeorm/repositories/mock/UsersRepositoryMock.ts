import { ICreateUserDTO } from 'modules/users/dtos/CreateUserDTO';

import { generateUuidV4 } from '../../../../../../shared/helpers';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryMock implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const createdUser: User = {
      id: generateUuidV4(),
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(createdUser);

    return createdUser;
  }
  async findByEmail(email: string): Promise<User> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }
  async findById(id: string): Promise<User> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }
  async delete(id: string): Promise<boolean> {
    const newUsers = this.users.filter((user) => user.id !== id);

    this.users = newUsers;

    return true;
  }
}

export { UsersRepositoryMock };
