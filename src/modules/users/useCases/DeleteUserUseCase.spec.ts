import { HttpException } from '@nestjs/common';

import { HashProvider } from '../../../shared/providers/HashProvider';
import { IUsersRepository } from '../infra/typeorm/repositories/IUsersRepository';
import { UsersRepositoryMock } from '../infra/typeorm/repositories/mock/UsersRepositoryMock';
import { CreateUserUseCase } from './CreateUserUseCase';
import { DeleteUserUseCase } from './DeleteUserUseCase';

describe('DeleteUserUseCase', () => {
  let usersRepository: IUsersRepository;
  const hashProvider = new HashProvider();
  let createUserUseCase: CreateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;

  const mockedUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'test',
  };

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();

    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);

    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete a user', async () => {
    const deleteUserResource = jest.spyOn(usersRepository, 'delete');

    const createdUser = await createUserUseCase.execute(mockedUser);

    await deleteUserUseCase.execute(createdUser.id);

    expect(deleteUserResource).toHaveBeenCalled();
  });

  it('should not be able to delete user if he dont exists', async () => {
    const userIdNontExistent = 'non-exists';

    await expect(
      deleteUserUseCase.execute(userIdNontExistent),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
