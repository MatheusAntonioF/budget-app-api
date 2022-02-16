import { HttpException } from '@nestjs/common';

import { mockedCategory } from '../../../shared/helpers/mock';
import { CategoriesRepositoryMock } from '../infra/typeorm/repositories/mock/CategoriesRepositoryMock';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { GetCategoryUseCase } from './GetCategoryUseCase';

describe('GetCategoryUseCase', () => {
  let categoriesRepository: CategoriesRepositoryMock;

  let createCategoryUseCase: CreateCategoryUseCase;
  let getCategoryUseCase: GetCategoryUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMock();

    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    getCategoryUseCase = new GetCategoryUseCase(categoriesRepository);
  });

  it('should be able to get category by your id', async () => {
    const createdCategory = await createCategoryUseCase.execute({
      ...mockedCategory,
      user_id: 'id-non-existent',
    });

    const foundCategory = await getCategoryUseCase.execute(createdCategory.id);

    expect(foundCategory).toMatchObject(createdCategory);
  });

  it('should not be able to get category if it dont exists', async () => {
    await expect(
      getCategoryUseCase.execute('id-non-existent'),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
