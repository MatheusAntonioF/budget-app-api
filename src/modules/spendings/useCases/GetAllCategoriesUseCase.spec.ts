import { IUsersRepository } from '../../../modules/users/infra/typeorm/repositories/IUsersRepository';
import { UsersRepositoryMock } from '../../../modules/users/infra/typeorm/repositories/mock/UsersRepositoryMock';
import { CreateUserUseCase } from '../../../modules/users/useCases/CreateUserUseCase';
import { mockedCategory, mockedUser } from '../../../shared/helpers/mock';
import { HashProvider } from '../../../shared/providers/HashProvider';
import { ICategoriesRepository } from '../infra/typeorm/repositories/ICategoriesRepository';
import { CategoriesRepositoryMock } from '../infra/typeorm/repositories/mock/CategoriesRepositoryMock';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { GetAllCategoriesUseCase } from './GetAllCategoriesUseCase';

describe('GetAllCategoriesUseCase', () => {
  let categoriesRepository: ICategoriesRepository;
  let usersRepository: IUsersRepository;
  const hashProvider = new HashProvider();
  let createUserUseCase: CreateUserUseCase;
  let createCategoryUseCase: CreateCategoryUseCase;
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMock();
    usersRepository = new UsersRepositoryMock();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepository);
  });

  it('should be able to get all categories', async () => {
    const createdUser = await createUserUseCase.execute(mockedUser);

    await createCategoryUseCase.execute({
      ...mockedCategory,
      user_id: createdUser.id,
    });

    const mockedSecondCategory = {
      name: 'Home',
      colorHex: '#7159c1',
    };

    await createCategoryUseCase.execute({
      ...mockedSecondCategory,
      user_id: createdUser.id,
    });

    const foundCategories = await getAllCategoriesUseCase.execute(
      createdUser.id,
    );

    const TOTAL_LENGTH = 2;

    expect(foundCategories).toHaveLength(TOTAL_LENGTH);
  });
});
