import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../infra/entities/User';
import { UsersRepository } from '../infra/repositories/implementations/UsersRepository';

import { HashProvider } from 'src/shared/providers/HashProvider';

@Injectable()
class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    const passwordHashed = await this.hashProvider.generateHash(password);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    delete createdUser.password;

    return createdUser;
  }
}

export { CreateUserUseCase };
