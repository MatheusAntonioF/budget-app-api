import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUsersRepository } from '../../../modules/users/infra/typeorm/repositories/IUsersRepository';
import { UsersRepositoryMock } from '../../../modules/users/infra/typeorm/repositories/mock/UsersRepositoryMock';
import { CreateUserUseCase } from '../../../modules/users/useCases/CreateUserUseCase';
import { HashProvider } from '../../../shared/providers/HashProvider';
import { AuthenticationUserUseCase } from './AuthenticateUserUseCase';

describe('AuthenticationUserUseCase', () => {
  let usersRepository: IUsersRepository;
  let hashProvider: HashProvider;
  let jwtService: JwtService;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticationUserUseCase;

  const mockedUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'test',
  };

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    hashProvider = new HashProvider();

    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);

    jwtService = new JwtService({
      secret: 'test-secret-key',
    });

    authenticateUserUseCase = new AuthenticationUserUseCase(
      usersRepository,
      hashProvider,
      jwtService,
    );
  });

  it('should be able to authenticate a user', async () => {
    const generateTokenResource = jest.spyOn(jwtService, 'sign');

    const { id, name, email } = await usersRepository.create(mockedUser);

    await authenticateUserUseCase.login({ id, name, email });

    expect(generateTokenResource).toHaveBeenCalled();
  });

  it('should be able to validate a user', async () => {
    await createUserUseCase.execute(mockedUser);

    const validatedUser = await authenticateUserUseCase.validateUser(
      mockedUser.email,
      mockedUser.password,
    );

    expect(validatedUser).toBeTruthy();
  });

  it('should not be able to validate a user if he dont exists', async () => {
    await expect(
      authenticateUserUseCase.validateUser(
        mockedUser.email,
        mockedUser.password,
      ),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('should not be able to validate a user if your password is wrong', async () => {
    await createUserUseCase.execute(mockedUser);

    await expect(
      authenticateUserUseCase.validateUser(mockedUser.email, 'wrong-password'),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
