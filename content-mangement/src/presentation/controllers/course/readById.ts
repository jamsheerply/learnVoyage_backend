import { Request, Response } from "express";
import { readByIdCourseUseCase } from "../../../application/useCases/course/readByIdCourseUseCase";
import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";

export const readByIdCourseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await readByIdCourseUseCase(CourseRepository)(id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }

    return res.status(200).json({ success: true, data: course });
  } catch (error: any) {
    console.error("Error reading course by ID:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
