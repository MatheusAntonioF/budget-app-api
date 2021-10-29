import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUsersRepository } from '../infra/typeorm/repositories/IUsersRepository';

@Injectable()
class GetUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: string) {
    const foundUser = await this.usersRepository.findById(id);

    if (!foundUser)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);

    return foundUser;
  }
}

export { GetUserUseCase };
