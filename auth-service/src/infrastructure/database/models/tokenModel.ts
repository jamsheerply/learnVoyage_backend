import mongoose, { Document, Schema } from "mongoose";
import { IToken } from "../../../domain/entities/token.enity";

const tokenSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400, //30days
  },
});

const TokenModel = mongoose.model<IToken & Document>("Token", tokenSchema);

export default TokenModel;
