import { NextFunction, Request, Response } from "express";
import { dependencies } from "../../_boot/dependencies";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const removeFromGroupController = (dependencies: IDependencies) => {
  const {
    useCases: { removeFromGroupChatUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, userId } = req.body;
      const removedFromgroupChat = await removeFromGroupChatUseCase(
        dependencies
      ).execute(chatId, userId);
      if (!removedFromgroupChat) {
        throw new Error("user not found to remove");
      }
      res.status(200).json({
        success: true,
        data: removedFromgroupChat,
        message: "removed from group chat successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
