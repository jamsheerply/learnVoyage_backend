import { Request, Response } from "express";
import { updateCourseUseCase } from "../../../application/useCases/course/updateCourseUseCase";
import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";

export const updateCourseController = async (req: Request, res: Response) => {
  try {
    const updatedCourse = await updateCourseUseCase(CourseRepository)(req.body);
    // console.log(JSON.stringify(updatedCourse));
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }
    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error: any) {
    console.error("Error updating course:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
