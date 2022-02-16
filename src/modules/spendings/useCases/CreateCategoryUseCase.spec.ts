import { HttpException } from '@nestjs/common';

import { mockedCategory } from '../../../shared/helpers/mock';
import { CategoriesRepositoryMock } from '../infra/typeorm/repositories/mock/CategoriesRepositoryMock';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('CreateCategoryUseCase', () => {
  let categoriesRepository: CategoriesRepositoryMock;

  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMock();

    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should not be able to create a category if it already exists', async () => {
    await createCategoryUseCase.execute({
      ...mockedCategory,
      user_id: 'id-non-existent',
    });

    await expect(
      createCategoryUseCase.execute({
        ...mockedCategory,
        user_id: 'id-non-existent',
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
