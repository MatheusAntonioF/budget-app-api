import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../infra/typeorm/repositories/ICategoriesRepository';

@Injectable()
class CreateCategoryUseCase {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
    colorHex,
    user_id,
  }: ICreateCategoryDTO): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists)
      throw new HttpException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );

    const createdCategory = await this.categoriesRepository.create({
      name,
      colorHex,
      user_id,
    });

    return createdCategory;
  }
}

export { CreateCategoryUseCase };
