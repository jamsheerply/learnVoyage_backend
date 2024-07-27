import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export default async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("🍃🍃🍃chat-Service connected to the database 🍃🍃🍃");
  } catch (error) {
    console.log("⛔⛔⛔ Failed to connect to the database ⛔⛔⛔");
    console.error(error);
    process.exit(1);
  }
};
