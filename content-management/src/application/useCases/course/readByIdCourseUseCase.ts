import { ICourse } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";

export const readByIdCourseUseCase = (CourseRepository: ICourseRepository) => {
  return async (id: string): Promise<ICourse | null> => {
    try {
      // Attempt to read the course by ID
      const course = await CourseRepository.readCourseById(id);

      // Check if the course was found
      if (!course) {
        throw new Error("Course not found");
      }

      return course;
    } catch (error) {
      // Log the error and rethrow it
      console.error(`Error reading course with ID ${id}:`, error);
      throw error;
    }
  };
};
