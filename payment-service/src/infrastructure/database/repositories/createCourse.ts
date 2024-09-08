import { CustomError } from "../../../_lib/common/customError";
import { courseEntity } from "../../../domain/entities/courseEntity";
import { CourseModal } from "../models";

export const createCourse = async (
  data: courseEntity
): Promise<courseEntity | null> => {
  try {
    const newCourse = await CourseModal.create(data);
    if (!newCourse) {
      throw new Error("course creation failed");
    }
    return newCourse;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
