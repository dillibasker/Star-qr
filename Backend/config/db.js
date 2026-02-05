import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dillibasker1_db_user:Star-QR@cluster0.nzl3hry.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
