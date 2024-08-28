import { ICourse } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";
import { ICourseQuery } from "../../../domain/entities/courseQuery";

interface IReadAllCoursesResponse {
  total: number;
  page: number;
  limit: number;
  courses: ICourse[];
}

export const readAllCoursesUseCase = (CourseRepository: ICourseRepository) => {
  return async (queryData: ICourseQuery): Promise<IReadAllCoursesResponse> => {
    try {
      // Attempt to read all courses based on query parameters
      const courses = await CourseRepository.readAllCourses(queryData);
      return courses;
    } catch (error) {
      // Log the error and rethrow it
      console.error("Error reading all courses:", error);
      throw new Error("Failed to read all courses");
    }
  };
};
