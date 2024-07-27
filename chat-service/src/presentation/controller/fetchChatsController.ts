import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const fetchChatsController = (dependencies: IDependencies) => {
  const {
    useCases: { fetchChatsUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fetchChatsUseCase(dependencies).execute(
        req.user?.id!
      );
      res.status(200).json({
        sucess: true,
        data: result,
        message: "Fetch chats successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
