import { CustomError } from "../../../_lib/common/customError";
import { ICourse } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";

export const readCourseUseCase = (CourseRepository: ICourseRepository) => {
  return async (queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
    category?: string[];
    price?: string[];
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    courses: ICourse[];
  } | null> => {
    try {
      const readCourse = await CourseRepository.readCourse(queryData);
      return readCourse;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
