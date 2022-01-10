import { getRepository } from 'typeorm';

import { ICreateCategoryDTO } from '../../../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  async findById(id: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const foundCategory = await categoriesRepository.findOne({
      where: { id },
    });

    return foundCategory;
  }

  async findByName(name: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const foundCategory = await categoriesRepository.findOne({
      where: { name },
    });

    return foundCategory;
  }

  async listAllCategoryByUserId(user_id: string): Promise<Category[]> {
    const categoriesRepository = getRepository(Category);

    const allCategories = await categoriesRepository.find({
      relations: ['spendings'],
      where: {
        user_id,
      },
    });

    return allCategories;
  }

  async create({
    name,
    colorHex,
    user_id,
  }: ICreateCategoryDTO): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const createdCategory = categoriesRepository.create({
      name,
      color_hex: colorHex,
      user_id,
    });

    await categoriesRepository.save(createdCategory);

    return createdCategory;
  }
}

export { CategoriesRepository };
