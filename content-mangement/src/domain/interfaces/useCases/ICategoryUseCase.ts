import { ICategory } from "../../entities/category.entity";

export interface ICategoryUseCase {
  createCategoryUseCase(categoryData: ICategory): Promise<ICategory | null>;
  readAllCategoryUseCase(): Promise<ICategory[] | null>;
  readByIdCategoryUseCase(id: string): Promise<ICategory | null>;
  updateCategoryUseCase(categoryData: ICategory): Promise<ICategory | null>;
}
