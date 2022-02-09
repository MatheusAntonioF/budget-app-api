import { HttpException } from '@nestjs/common';

import { HashProvider } from '../../../shared/providers/HashProvider';
import { IUsersRepository } from '../infra/typeorm/repositories/IUsersRepository';
import { UsersRepositoryMock } from '../infra/typeorm/repositories/mock/UsersRepositoryMock';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let usersRepository: IUsersRepository;
  const hashProvider = new HashProvider();
  let createUserUseCase: CreateUserUseCase;

  const mockedUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'test',
  };

  beforeEach(async () => {
    usersRepository = new UsersRepositoryMock();

    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const createdUser = await createUserUseCase.execute(mockedUser);

    expect(createdUser).toHaveProperty('id');
  });

  it('should not be able to create a new user if your email already exists', async () => {
    await createUserUseCase.execute(mockedUser);

    await expect(createUserUseCase.execute(mockedUser)).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});
