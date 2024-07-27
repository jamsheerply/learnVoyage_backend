import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const renameGroupChatController = (dependencies: IDependencies) => {
  const {
    useCases: { updateChatByIdUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, ...data } = req.body;
      const updatedChat = await updateChatByIdUseCase(dependencies).execute(
        chatId,
        data
      );
      if (!updatedChat) {
        throw new Error("chat no found");
      }
      res.status(200).json({
        success: true,
        data: updatedChat,
        message: "chat updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
