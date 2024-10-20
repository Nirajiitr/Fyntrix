import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    pincode: String,
    city: String,
    state: String,
    country: String,
    phone: String,
    
  },
  {
    timestamps: true,
  }
);
export const Address = mongoose.model("Address", addressSchema);
