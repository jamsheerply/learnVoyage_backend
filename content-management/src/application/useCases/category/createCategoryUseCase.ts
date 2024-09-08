import { ICategory } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/interfaces/repositories/ICategoryRepositoty";

export const createCategoryUseCase = (
  categoryRepository: ICategoryRepository
) => {
  return async (categoryData: ICategory): Promise<ICategory | null> => {
    const existingCategory = await categoryRepository.readByNameCategory(
      categoryData.categoryName
    );
    if (existingCategory) {
      throw new Error("Category already exists");
    }

    const newCategory = await categoryRepository.createCategory(categoryData);
    return newCategory;
  };
};
