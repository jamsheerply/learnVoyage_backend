import { ICategory } from "../../entities/category.entity";

export interface ICategoryRepository {
  createCategory(category: ICategory): Promise<ICategory>;
  readAllCategory(): Promise<ICategory[]>;
  readByNameCategory(categoryName: string): Promise<ICategory | null>;
  readByIdCategory(id: string): Promise<ICategory | null>;
  updateCategory(category: ICategory): Promise<ICategory>;
}
