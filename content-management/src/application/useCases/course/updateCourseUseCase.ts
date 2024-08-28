import { ICourse } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";

export const updateCourseUseCase = (CourseRepository: ICourseRepository) => {
  return async (courseData: ICourse): Promise<ICourse | null> => {
    try {
      // Check if the course exists
      const existingCourse = await CourseRepository.readCourseById(
        courseData.id
      );
      if (!existingCourse) {
        throw new Error("Course not found");
      }

      // Check if the course name already exists and belongs to a different course
      if (courseData.courseName) {
        const courseByName = await CourseRepository.readCourseByName(
          courseData.courseName
        );
        if (courseByName && courseByName.id !== courseData.id) {
          throw new Error("Course name already exists");
        }
      }

      // Update the course
      const updatedCourse = await CourseRepository.updateCourse(courseData);
      return updatedCourse;
    } catch (error) {
      // Log the error and rethrow it to be handled by the caller
      console.error("Error updating course:", error);
      throw error;
    }
  };
};
