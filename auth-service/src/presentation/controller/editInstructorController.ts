import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { editInstructorUseCase } from "../../application/useCases/editInstructorUseCase";

export const editInstructorController = async (req: Request, res: Response) => {
  try {
    const { id, isBlocked } = req.body;

    if (!id || typeof isBlocked !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }

    const patchInstructors = editInstructorUseCase(UserRepository);
    const instructor = await patchInstructors(id, isBlocked);

    res.status(200).json({ success: true, data: instructor });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
