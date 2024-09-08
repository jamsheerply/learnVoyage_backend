import { paymentEntityPop } from "../../../domain/entities/paymentEntityPop";
import { PaymentModel } from "../models";

export const downloadTransations = async (
  startDate: string,
  endDate: string
): Promise<paymentEntityPop[]> => {
  try {
    const query: Record<string, any> = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const transactions = await PaymentModel.find(query)
      .populate("userId")
      .populate({
        path: "courseId",
        populate: {
          path: "mentorId",
        },
      })
      .lean<paymentEntityPop[]>();

    return transactions;
  } catch (error) {
    console.error("Error reading payments:", error);
    throw new Error("Failed to read payments");
  }
};
