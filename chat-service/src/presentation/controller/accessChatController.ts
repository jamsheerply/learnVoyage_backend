import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const accessChatController = (dependencies: IDependencies) => {
  const {
    useCases: { accessChatUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        throw new Error("userId param not sent with request");
      }
      const result = await accessChatUseCase(dependencies).execute(
        req.user?.id!,
        userId
      );
      res.status(200).json({
        success: true,
        data: result,
        message: "chat accessed  success!",
      });
    } catch (error) {
      next(error);
    }
  };
};
