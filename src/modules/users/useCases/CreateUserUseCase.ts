import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { HashProvider } from '../../../shared/providers/HashProvider';
import { ICreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../infra/typeorm/repositories/IUsersRepository';

@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Omit<User, 'password'>> {
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
