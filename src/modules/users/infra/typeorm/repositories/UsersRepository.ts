import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/modules/users/dtos/CreateUserDTO';
import { IUsersRepository } from 'src/modules/users/interfaces/IUsersRepository';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

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

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({ name, email, password });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersRepository };
