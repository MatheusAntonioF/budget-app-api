import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersRepository } from '../infra/repositories/implementations/UsersRepository';

@Injectable()
class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const foundUser = await this.usersRepository.findById(id);

    if (!foundUser)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return foundUser;
  }
}

export { GetUserUseCase };
