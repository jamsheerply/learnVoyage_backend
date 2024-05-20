import { IDependencies } from "../../domain/interfaces";
import { NextFunction, Request, Response } from "express";
import { addUserValidation } from "../../utils/validation/addUserValidation";

export const signupController = (dependencies: IDependencies) => {
  const {
    useCase: { signupUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { error } = addUserValidation.validate(userData);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error,
          data: {},
        });
      }
      const user = await signupUseCase(dependencies).execute(userData);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: user,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
};
