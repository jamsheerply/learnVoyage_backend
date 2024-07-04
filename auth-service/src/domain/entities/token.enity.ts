import { ObjectId } from "mongoose";

export interface IToken {
  userId: ObjectId;
  token: string;
  createdAt: Date;
}
