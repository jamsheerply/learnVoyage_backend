import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { getAllInstructorUseCase } from "../../application/useCases/getAllInstructorUseCase";

export const getAllInstructorsController = async (
  req: Request,
  res: Response
) => {
  try {
    const fetchInstructors = getAllInstructorUseCase(UserRepository);
    const instructors = await fetchInstructors();
    res.status(200).json({ success: true, data: instructors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching instructors." });
  }
};
