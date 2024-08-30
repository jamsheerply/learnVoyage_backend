import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { sendMessage } from "../../infrastructure/messageBroker/producerRpc";

export const updatePaymentController = (dependencies: IDependencies) => {
  const {
    useCases: { updatePaymentUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, status } = req.body;
      console.log(req.body);
      if (!status || !_id) {
        throw new Error("missing required status field");
      }
      const result = await updatePaymentUseCase(dependencies).execute(req.body);
      console.log("result?.status", result?.status);

      if (result?._id && result.status === "completed") {
        sendMessage(
          "content-management-service",
          {
            type: "createEnrollment",
            data: result,
          },
          (response) => {
            console.log("Response from content-management-service:", response);
            // Handle the response here
          }
        );
      }
      return res.status(200).json({
        success: true,
        data: result,
        message: "payment updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
