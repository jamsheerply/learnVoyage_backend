import { CustomError } from "../../../_lib/common/customError";
import { paymentEntity } from "../../../domain/entities/paymentEntity";
import { PaymentModel } from "../models";

export const updatePayment = async (
  data: paymentEntity
): Promise<paymentEntity | null> => {
  try {
    const { _id, ...rest } = data;
    const update = await PaymentModel.findByIdAndUpdate(_id, rest, {
      new: true,
    });

    if (!update) {
      throw new Error("Update failed");
    }
    return update;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
