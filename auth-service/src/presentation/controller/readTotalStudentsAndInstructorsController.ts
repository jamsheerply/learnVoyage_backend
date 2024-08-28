import { Request, Response } from "express";
import { readTotalStudnetAndInstructorUseCase } from "../../application/useCases/readTotalStudentsAndInstructorsUseCase";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { CustomError } from "../../_lib/common/customError";

export const readTotalStudentsAndInstructorsController = async (
  req: Request,
  res: Response
) => {
  try {
    const totalStudentsAndInstructorsUseCase =
      await readTotalStudnetAndInstructorUseCase(UserRepository)();
    return res
      .status(200)
      .json({ success: true, data: totalStudentsAndInstructorsUseCase });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error reading result", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
