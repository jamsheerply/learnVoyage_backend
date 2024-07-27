import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const createGroupChatController = (dependencies: IDependencies) => {
  const {
    useCases: { createGroupChatUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { users, chatName } = req.body;
      if (!users || !chatName) {
        throw new Error("Please fill all the fields");
      }
      var usersParsed = users;
      if (usersParsed.length < 1) {
        throw new Error("more than 1 users required to form  a group chat");
      }
      usersParsed.push(req.user?.id);

      const result = await createGroupChatUseCase(dependencies).execute(
        chatName,
        usersParsed,
        req.user?.id!
      );
      res.status(200).json({
        sucess: true,
        data: result,
        message: "group chat create successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
