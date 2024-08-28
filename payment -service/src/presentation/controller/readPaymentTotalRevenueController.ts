import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const readPaymentTotalRevenueController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { readPaymentTotalRevenueUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalRevenue = await readPaymentTotalRevenueUseCase(
        dependencies
      ).execute();
      return res.status(200).json({
        success: true,
        data: totalRevenue,
        message: "read totalRevenue successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
