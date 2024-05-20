import dotenv from "dotenv";

dotenv.config();

const DB_NAME: string = String(process.env.DB_NAME);
const DB_PASS: string = String(process.env.DB_PASS);

export const MONGODB_URI = `mongodb+srv://${DB_NAME}:${DB_PASS}@learnvoyage.a3qrwmv.mongodb.net/user-service?retryWrites=true&w=majority&appName=LearnVoyage`;
