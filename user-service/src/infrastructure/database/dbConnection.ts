import mongoose from "mongoose";
import { MONGODB_URI } from "../../config/envConfig/config";
export default async () => {
  try {
    mongoose.connect(String(MONGODB_URI).trim());
    console.log("user-service connnected to the database");
  } catch (error) {
    console.log("user-service failed to connect database");
    console.log(error);
  }
};
