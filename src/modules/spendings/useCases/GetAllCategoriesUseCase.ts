import { Inject, Injectable } from '@nestjs/common';

import { Category } from '../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../infra/typeorm/repositories/ICategoriesRepository';

@Injectable()
class GetAllCategoriesUseCase {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(user_id: string): Promise<Category[]> {
    const allCategories =
      await this.categoriesRepository.listAllCategoryByUserId(user_id);

    return allCategories;
  }
}

export { GetAllCategoriesUseCase };
