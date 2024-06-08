import { ICategory } from "../../domain/entities/category.entity";
import { ICategoryRepository } from "../../domain/interfaces/repositories/ICategoryRepositoty";

export const updateCategoryUseCase = (
  categoryRepository: ICategoryRepository
) => {
  return async (categoryData: ICategory): Promise<ICategory | null> => {
    const existingCategory = await categoryRepository.readByIdCategory(
      categoryData.id
    );
    if (!existingCategory) {
      throw new Error("Category not found");
    }
    const updatedCategory = await categoryRepository.updateCategory(
      categoryData
    );
    return updatedCategory;
  };
};
