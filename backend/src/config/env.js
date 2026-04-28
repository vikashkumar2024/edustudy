import { configDotenv } from "dotenv";
configDotenv({});

export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN: process.env.ADMIN,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY: process.env.CLOUDINARY_API_SECRET_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  STRIP_Publishable_key: process.env.STRIP_Publishable_key,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
};
