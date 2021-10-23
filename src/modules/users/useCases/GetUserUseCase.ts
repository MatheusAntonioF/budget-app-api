import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const foundUser = await this.usersRepository.findById(id);

    return foundUser;
  }
}

export { GetUserUseCase };
