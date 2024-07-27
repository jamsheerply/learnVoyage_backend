import { NextFunction, Request, Response } from "express";
import { getProfileByIdUseCase } from "../../application/useCases/getProfileByIdUseCase";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";

export const getProfileByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const getProfileById = await getProfileByIdUseCase(UserRepository)(id);
    return res.status(201).json({ success: true, data: getProfileById });
  } catch (error) {
    next(error);
  }
};
