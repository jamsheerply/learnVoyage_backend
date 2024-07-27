import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const SearchUserController = (dependencies: IDependencies) => {
  const {
    useCases: { searchUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keyword = req.query.search as string;
      const currentId = req.user?.id;

      if (!keyword || !currentId) {
        return res.status(400).json({
          success: false,
          message: "Keyword or userId is missing from the request",
        });
      }

      const search = await searchUserUseCase(dependencies).execute(
        keyword,
        currentId
      );

      if (!search) {
        return res.status(404).json({
          success: false,
          message: "No users found",
        });
      }

      res.status(200).json({
        success: true,
        data: search,
        message: "Users retrieved successfully!",
      });
    } catch (error) {
      next(error);
    }
  };
};
