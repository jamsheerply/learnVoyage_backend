import { Request, Response } from "express";
import { readAllRoleUseCase } from "../../application/useCases/readAllRoleUseCase";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { CustomError } from "../../_lib/common/customError";

export const readIntructorController = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, filter } = req.query;
    const queryData = {
      role: "instructor",
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(limit as string, 10) || 10,
      search: (search as string) || undefined,
      filter: (filter as string) || undefined,
    };

    const readInstructor = await readAllRoleUseCase(UserRepository)(queryData);
    return res.status(200).json({ success: true, data: readInstructor });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error creating assessment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
