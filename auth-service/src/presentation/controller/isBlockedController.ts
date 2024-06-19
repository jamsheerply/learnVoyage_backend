import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { isBlockedUseCase } from "../../application/useCases/isBlockedUseCase";

export const isBlockedController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isBlocked = await isBlockedUseCase(UserRepository)(id);
    return res.status(200).json({ success: true, data: isBlocked });
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(500).json({ success: false, error: error.message });
  }
};
