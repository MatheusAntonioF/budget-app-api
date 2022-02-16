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
import { GetAllSpendingsUseCase } from './GetAllSpendingsUseCase';

describe('GetAllSpendingsUseCase', () => {
  let usersRepository: UsersRepositoryMock;
  const hashProvider = new HashProvider();
  let createUserUseCase: CreateUserUseCase;

  let spendingsRepository: SpendingsRepositoryMock;
  let categoriesRepository: CategoriesRepositoryMock;
  let createCategoryUseCase: CreateCategoryUseCase;
  let createSpendingsUseCase: CreateSpendingUseCase;
  let getAllSpendingsUseCase: GetAllSpendingsUseCase;

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
    getAllSpendingsUseCase = new GetAllSpendingsUseCase(spendingsRepository);
  });

  it('should be able to list all spendings by created user id', async () => {
    const { id: createdUserId } = await createUserUseCase.execute(mockedUser);

    const { id: createdCategoryId } = await createCategoryUseCase.execute({
      ...mockedCategory,
      user_id: createdUserId,
    });

    await createSpendingsUseCase.execute({
      ...mockedSpending,
      user_id: createdUserId,
      category_id: createdCategoryId,
    });

    const mockedSecondSpending = {
      name: 'Security',
      description: 'Car security',
      date: new Date(),
      value: 2000,
    };

    await createSpendingsUseCase.execute({
      ...mockedSecondSpending,
      user_id: createdUserId,
      category_id: createdCategoryId,
    });

    const foundSpendings = await getAllSpendingsUseCase.execute(createdUserId);

    const TOTAL_LENGTH = 2;

    expect(foundSpendings).toHaveLength(TOTAL_LENGTH);
  });
});
