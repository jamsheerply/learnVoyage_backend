import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { getAllStudentUseCase } from "../../application/useCases/getAllStudentUseCase";

export const getAllStudentsController = async (req: Request, res: Response) => {
  try {
    const fetchInstructors = getAllStudentUseCase(UserRepository);
    const instructors = await fetchInstructors();
    res.status(200).json({ success: true, data: instructors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching instructors." });
  }
};
