import "dotenv/config";
import mongoose from "mongoose";

const { MONGO_URL } = process.env;

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Deu certo a coneção com o MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
