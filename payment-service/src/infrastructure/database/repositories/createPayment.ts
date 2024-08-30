import { CustomError } from "../../../_lib/common/customError";
import { paymentEntity } from "../../../domain/entities/paymentEntity";
import { PaymentModel } from "../models";

export const createPayment = async (
  data: paymentEntity
): Promise<paymentEntity | null> => {
  try {
    const existing = await PaymentModel.findOne({
      userId: data.userId,
      courseId: data.courseId,
      status: data.status,
    });
    if (existing) {
      return existing;
    }

    const newPayment = await PaymentModel.create(data);

    if (!newPayment) {
      throw new Error("payment creation failed");
    }
    return newPayment;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
