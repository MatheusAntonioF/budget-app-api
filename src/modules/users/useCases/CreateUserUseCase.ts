import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserDTO) {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return createdUser;
  }
}

export { CreateUserUseCase };
