import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("database connection error: ", error);
  }
};
export default connectDB;
