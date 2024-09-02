import { CustomError } from "../../../_lib/common/customError";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";

export const readCourseTotalCoursesUseCase = (
  CourseRepository: ICourseRepository
) => {
  return async (mentorId: string): Promise<number | null> => {
    try {
      const totalCourses = await CourseRepository.readTotalCourses(mentorId);
      return totalCourses;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
