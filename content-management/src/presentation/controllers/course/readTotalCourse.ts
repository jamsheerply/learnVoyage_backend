import { Request, Response } from "express";
import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";
import { readCourseTotalCoursesUseCase } from "../../../application/useCases/course/readCourseTotalCoursesUseCase";
import { CustomError } from "../../../_lib/common/customError";

export const readCourseTotalCoursesController = async (
  req: Request,
  res: Response
) => {
  try {
    const mentorId = req.user?.id;
    const totalCoursse = await readCourseTotalCoursesUseCase(CourseRepository)(
      mentorId?.toString()!
    );
    return res.status(200).json({ success: true, data: totalCoursse });
  } catch (error) {
    const customError = error as CustomError;
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
