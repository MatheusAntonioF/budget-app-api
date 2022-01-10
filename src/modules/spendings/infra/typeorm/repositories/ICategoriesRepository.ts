import { ICreateCategoryDTO } from '../../../dtos/ICreateCategoryDTO';
import { Category } from '../entities/Category';

interface ICategoriesRepository {
  findById(id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  create(createCategory: ICreateCategoryDTO): Promise<Category>;
  listAllCategoryByUserId(user_id: string): Promise<Category[]>;
}

export { ICategoriesRepository };
