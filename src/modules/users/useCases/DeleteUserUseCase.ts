import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUsersRepository } from '../infra/typeorm/repositories/IUsersRepository';

@Injectable()
class DeleteUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: string) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
