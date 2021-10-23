import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashProvider } from 'src/shared/providers/HashProvider';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

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
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

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
