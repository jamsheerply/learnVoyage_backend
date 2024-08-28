import { CustomError } from "../../../_lib/common/customError";
import { PaymentModel } from "../models";

export const readPaymentTotalRevene = async (): Promise<{
  totalRevenue: number;
} | null> => {
  try {
    const totalRevenue = await PaymentModel.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    if (!totalRevenue || totalRevenue.length === 0) {
      throw new Error("No completed payments found");
    }

    return { totalRevenue: totalRevenue[0].total };
  } catch (error) {
    const customError = error as CustomError;
    console.log("readPaymentTotalRevene", customError.message);
    throw new Error(customError?.message);
  }
};
