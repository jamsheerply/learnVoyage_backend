import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    ennum: ["pending", "completed", "failed"],
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: function () {
      return Date.now();
    },
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const PaymentModel = model("Payment", paymentSchema);