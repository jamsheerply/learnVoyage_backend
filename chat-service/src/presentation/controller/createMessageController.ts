import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const createMessageController = (dependencies: IDependencies) => {
  const {
    useCases: { createMessageUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, chatId } = req.body as {
        content: string;
        chatId: string;
      };
      if (!content || !chatId) {
        throw new Error("Invalid data passed into request");
      }

      const result = await createMessageUseCase(dependencies).execute(
        req.user?.id!,
        chatId,
        content
      );
      res.status(200).json({
        sucess: true,
        data: result,
        message: "message created successfully!",
      });
    } catch (error) {
      next(error);
    }
  };
};
