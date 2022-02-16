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
import { UpdateSpendingUseCase } from './UpdateSpendingUseCase';

describe('UpdateSpendingsUseCase', () => {
  let usersRepository: UsersRepositoryMock;
  const hashProvider = new HashProvider();
  let createUserUseCase: CreateUserUseCase;

  let spendingsRepository: SpendingsRepositoryMock;
  let categoriesRepository: CategoriesRepositoryMock;
  let createCategoryUseCase: CreateCategoryUseCase;
  let createSpendingsUseCase: CreateSpendingUseCase;

  let updateSpendingUseCase: UpdateSpendingUseCase;

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
    updateSpendingUseCase = new UpdateSpendingUseCase(spendingsRepository);
  });

  it('should be able to update a spending by your id', async () => {
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

    const updatedName = 'updated-name';

    const updatedSpending = await updateSpendingUseCase.execute(
      createdSpending.id,
      {
        name: updatedName,
      },
    );

    expect(updatedSpending.name).toEqual(updatedName);
  });

  it('should not be able to update a spending if it dont exists', async () => {
    const updatedName = 'updated-name';

    await expect(
      updateSpendingUseCase.execute('id-non-existent', {
        name: updatedName,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
