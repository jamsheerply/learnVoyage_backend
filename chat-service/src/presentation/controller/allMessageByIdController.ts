import { NextFunction, Request, Response } from "express";
import { dependencies } from "../../_boot/dependencies";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const allMessageByIdController = (dependencies: IDependencies) => {
  const {
    useCases: { allMessageByIdUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId } = req.params;
      if (!chatId) {
        throw new Error("chatId param not sent with request");
      }
      const result = await allMessageByIdUseCase(dependencies).execute(chatId);
      res
        .status(200)
        .json({
          success: true,
          data: result,
          message: "fetch all message byId successfully",
        });
    } catch (error) {
      next(error);
    }
  };
};
