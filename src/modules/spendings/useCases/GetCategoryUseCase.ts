import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Category } from '../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../infra/typeorm/repositories/ICategoriesRepository';

@Injectable()
class GetCategoryUseCase {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    const existsCategory = await this.categoriesRepository.findById(id);

    if (!existsCategory)
      throw new HttpException('Category Not Found', HttpStatus.BAD_REQUEST);

    return existsCategory;
  }
}

export { GetCategoryUseCase };
