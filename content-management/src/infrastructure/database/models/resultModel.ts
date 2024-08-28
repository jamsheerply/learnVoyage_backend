import { model, Schema } from "mongoose";
import { ResultEntity } from "../../../domain/entities/resultEntity";

const resultSchema = new Schema<ResultEntity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "failed", "pending"],
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ResultModel = model<ResultEntity>("Result", resultSchema);
