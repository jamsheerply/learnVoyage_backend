import { NextFunction, Request, Response } from "express";
import { dependencies } from "../../_boot/dependencies";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const addToGroupController = (dependencies: IDependencies) => {
  const {
    useCases: { addToGroupChatUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, userId } = req.body;
      const addedToGroupChat = await addToGroupChatUseCase(
        dependencies
      ).execute(chatId, userId);
      if (!addedToGroupChat) {
        throw new Error("failded to add groupchat ");
      }
      res.status(200).json({
        success: true,
        data: addedToGroupChat,
        message: "added to group successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
