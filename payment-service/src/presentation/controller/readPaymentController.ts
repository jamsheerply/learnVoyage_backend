import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const readPaymentController = (dependencies: IDependencies) => {
  const {
    useCases: { readPaymentUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search, method, status } = req.query;
      const queryData = {
        page: parseInt(page as string, 10) || 1,
        limit: parseInt(limit as string, 10) || 10,
        search: (search as string) || undefined,
        method: Array.isArray(method)
          ? (method as string[])
          : method
          ? [method as string]
          : [],
        status: Array.isArray(status)
          ? (status as string[])
          : status
          ? [status as string]
          : [],
      };
      console.log(queryData);
      const result = await readPaymentUseCase(dependencies).execute(queryData);
      return res.status(200).json({
        success: true,
        data: result,
        message: "read payment successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
