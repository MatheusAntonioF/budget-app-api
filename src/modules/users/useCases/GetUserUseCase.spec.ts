import { HttpException } from '@nestjs/common';

import { HashProvider } from '../../../shared/providers/HashProvider';
import { IUsersRepository } from '../infra/typeorm/repositories/IUsersRepository';
import { UsersRepositoryMock } from '../infra/typeorm/repositories/mock/UsersRepositoryMock';
import { CreateUserUseCase } from './CreateUserUseCase';
import { GetUserUseCase } from './GetUserUseCase';

describe('GetUserUseCase', () => {
  let usersRepository: IUsersRepository;
  const hashProvider = new HashProvider();
  let createUserUseCase: CreateUserUseCase;

  let getUserUseCase: GetUserUseCase;

  const mockedUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'test',
  };

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();

    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);

    getUserUseCase = new GetUserUseCase(usersRepository);
  });

  it('should be able to get a existent user', async () => {
    const createdUser = await createUserUseCase.execute(mockedUser);

    const foundUser = await getUserUseCase.execute(createdUser.id);

    expect(foundUser.id).toEqual(createdUser.id);
  });

  it('shoud not be able to get a user if he dont exists', async () => {
    await expect(getUserUseCase.execute('non-existent')).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});
