import { rateAndReviewEntity } from "../../../domain/entities/rateAndReviewEntity";
import { model, Schema } from "mongoose";

const rateAndReviewSchema = new Schema<rateAndReviewEntity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RateAndReviewModal = model<rateAndReviewEntity>(
  "RateAndReview",
  rateAndReviewSchema
);
