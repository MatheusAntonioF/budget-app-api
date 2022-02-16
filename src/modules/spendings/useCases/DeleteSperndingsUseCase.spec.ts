import { HttpException } from '@nestjs/common';

import { UsersRepositoryMock } from '../../../modules/users/infra/typeorm/repositories/mock/UsersRepositoryMock';
import { CreateUserUseCase } from '../../../modules/users/useCases/CreateUserUseCase';
import {
  mockedCategory,
  mockedSpending,
  mockedUser,
} from '../../../shared/helpers/mock';
import { HashProvider } from '../../../shared/providers/HashProvider';
import { CategoriesRepositoryMock } from '../infra/typeorm/repositories/mock/CategoriesRepositoryMock';
import { SpendingsRepositoryMock } from '../infra/typeorm/repositories/mock/SpendingsRepositoryMock';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { CreateSpendingUseCase } from './CreateSpendingUseCase';
import { DeleteSpendingUseCase } from './DeleteSpendingUseCase';

describe('DeleteSpendingsUseCase', () => {
  let usersRepository: UsersRepositoryMock;
  const hashProvider = new HashProvider();
  let createUserUseCase: CreateUserUseCase;

  let spendingsRepository: SpendingsRepositoryMock;
  let categoriesRepository: CategoriesRepositoryMock;
  let createCategoryUseCase: CreateCategoryUseCase;
  let createSpendingsUseCase: CreateSpendingUseCase;
  let deleteSpendingsUseCase: DeleteSpendingUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);

    spendingsRepository = new SpendingsRepositoryMock();
    categoriesRepository = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    createSpendingsUseCase = new CreateSpendingUseCase(
      spendingsRepository,
      categoriesRepository,
    );

    deleteSpendingsUseCase = new DeleteSpendingUseCase(spendingsRepository);
  });

  it('should be able to delete a spendings', async () => {
    const { id: createdUserId } = await createUserUseCase.execute(mockedUser);

    const { id: createdCategoryId } = await createCategoryUseCase.execute({
      ...mockedCategory,
      user_id: createdUserId,
    });

    const createdSpending = await createSpendingsUseCase.execute({
      ...mockedSpending,
      user_id: createdUserId,
      category_id: createdCategoryId,
    });

    const deleteResource = jest.spyOn(spendingsRepository, 'delete');

    await deleteSpendingsUseCase.execute(createdSpending.id);

    expect(deleteResource).toHaveBeenCalled();
  });

  it('should not be able to delete a spendings if it dont exists', async () => {
    await expect(
      deleteSpendingsUseCase.execute('id-non-existent'),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
