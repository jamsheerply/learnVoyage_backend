import { paymentEntity } from "../../../domain/entities/paymentEntity";
import { PaymentModel } from "../models";

export const readPayment = async (queryData: {
  page: number;
  limit: number;
  search?: string;
  method?: string[];
  status?: string[];
}): Promise<{
  total: number;
  page: number;
  limit: number;
  payments: paymentEntity[];
} | null> => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      method = [],
      status = [],
    } = queryData;

    let paymentQuery: any = {};

    // Apply search filter
    if (search) {
      //   paymentQuery.$or = [
      //     { method: { $regex: search, $options: "i" } },
      //     { status: { $regex: search, $options: "i" } },
      //     { amount: { $regex: search, $options: "i" } },
      //   ];
    }

    // Apply method filter
    if (method.length > 0) {
      if (!(method.includes("card") && method.includes("upi"))) {
        paymentQuery.method = { $in: method };
      }
    }

    // Apply status filter
    if (status.length > 0) {
      paymentQuery.status = { $in: status };
    }

    // Count total documents that match the query
    const total = await PaymentModel.countDocuments(paymentQuery);

    // Fetch payments with pagination
    const payments = await PaymentModel.find(paymentQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      total,
      page,
      limit,
      payments,
    };
  } catch (error) {
    console.error("Error reading payments:", error);
    throw new Error("Failed to read payments");
  }
};
