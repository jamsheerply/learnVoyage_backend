import { Request, Response } from "express";
import { createCourseUseCase } from "../../../application/useCases/course/createCourseUseCase";
import { ICourse } from "../../../domain/entities/course.entity";
import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";
import { sendMessage } from "../../../infrastructure/messageBroker/producerRpc";

export const createCourseController = async (req: Request, res: Response) => {
  try {
    const newCourse: ICourse = {
      id: "",
      ...req.body,
    };

    const createdCourse = await createCourseUseCase(CourseRepository)(
      newCourse
    );

    if (!createdCourse) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to create course" });
    } else {
      sendMessage(
        "chat-service",
        { type: "createGroupChat", data: createdCourse },
        (response: any) => {
          // Specify the type of response as any or more specific type if known
          console.log("Response from chat-service:", response);
          // Handle the response here
        }
      );
      sendMessage(
        "payment-service",
        { type: "createCourse", data: createdCourse },
        (response: any) => {
          // Specify the type of response as any or more specific type if known
          console.log("Response from content-management-service:", response);
          // Handle the response here
        }
      );
    }

    return res.status(201).json({ success: true, data: createdCourse });
  } catch (error: any) {
    console.error("Error creating course:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
