import mongoose from "mongoose";
import secret from "./secret";

const connectDB = async () => {
  try {
    await mongoose.connect(secret.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
