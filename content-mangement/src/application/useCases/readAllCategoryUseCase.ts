import { ICategory } from "../../domain/entities/category.entity";
import { ICategoryRepository } from "../../domain/interfaces/repositories/ICategoryRepositoty.js";

export const readAllCategoryUseCase = (
  categoryRepository: ICategoryRepository
) => {
  return async (): Promise<ICategory[]> => {
    const readAllCategories = await categoryRepository.readAllCategory();
    return readAllCategories;
  };
};
