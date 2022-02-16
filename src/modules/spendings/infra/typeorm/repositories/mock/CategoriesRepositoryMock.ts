import { generateUuidV4 } from '../../../../../../shared/helpers';
import { ICreateCategoryDTO } from '../../../../../spendings/dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryMock implements ICategoriesRepository {
  private categories: Category[] = [];

  async findById(id: string): Promise<Category> {
    const foundCategory = this.categories.find(
      (category) => category.id === id,
    );

    return foundCategory;
  }
  async findByName(name: string): Promise<Category> {
    const foundCategory = this.categories.find((category) =>
      category.name.includes(name),
    );

    return foundCategory;
  }
  async create(createCategory: ICreateCategoryDTO): Promise<Category> {
    const createdCategory = new Category();

    Object.assign(createdCategory, { id: generateUuidV4(), ...createCategory });

    this.categories.push(createdCategory);

    return createdCategory;
  }
  async listAllCategoryByUserId(user_id: string): Promise<Category[]> {
    const foundCategories = this.categories.filter(
      (category) => category.user_id === user_id,
    );

    return foundCategories;
  }
}

export { CategoriesRepositoryMock };
