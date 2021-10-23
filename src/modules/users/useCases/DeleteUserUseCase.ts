import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
