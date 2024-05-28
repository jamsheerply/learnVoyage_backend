import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@learnvoyage.a3qrwmv.mongodb.net/auth-service?retryWrites=true&w=majority&appName=LearnVoyage`;

export default async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("🍃🍃🍃 Auth-Service connected to the database 🍃🍃🍃");
  } catch (error) {
    console.log("⛔⛔⛔ Failed to connect to the database ⛔⛔⛔");
    console.error(error);
    process.exit(1);
  }
};
