import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../../dtos/CreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne(id);

    return foundUser;
  }

  async findByEmail(email: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({
      where: { email },
    });

    return foundUser;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({ name, email, password });

    await this.usersRepository.save(user);

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.usersRepository.delete(id);

    return !!deletedUser;
  }
}

export { UsersRepository };
