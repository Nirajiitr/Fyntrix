import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cardId :  {
      type: String,
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    addressInfo: {
      addressId: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      notes: String,
    },
    orderStatus: {
      type: String,
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      default: "Unpaid",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderUpdateDate: {
      type: Date,
    },
    paymentId: String,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
