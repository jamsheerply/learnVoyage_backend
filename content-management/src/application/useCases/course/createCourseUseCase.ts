import { ICourse } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";

export const createCourseUseCase = (CourseRepository: ICourseRepository) => {
  return async (courseData: ICourse): Promise<ICourse | null> => {
    try {
      // Check if the course already exists by name
      const existingCourse = await CourseRepository.readCourseByName(
        courseData.courseName
      );
      if (existingCourse) {
        throw new Error("Course already exists");
      }

      // Create the new course
      const newCourse = await CourseRepository.createCourse(courseData);
      return newCourse;
    } catch (error: any) {
      // Log the error and rethrow it
      console.error("Error creating course:", error.mesage);
      throw new Error(error.message);
    }
  };
};
