const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    shipping: {
      address: {
        type: String,
        required: [true, "Shipping Address is required"],
      },
      city: { type: String, required: [true, "Shipping City is required"] },
      phoneNumber: {
        type: String,
        required: [true, "Shipping Phone Number is required"],
      },
      zipCode: {
        type: String,
        required: [true, "Shipping Zip Code is required"],
      },
      country: {
        type: String,
        required: [true, "Shipping Country is required"],
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: [true, "Order name is required"] },
        quantity: {
          type: Number,
          required: [true, "Order quantity is required"],
        },
        image: { type: String, required: [true, "Order name is required"] },
        price: { type: Number, required: [true, "Order price is required"] },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Order Product is required"],
          ref: "Product",
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
      enum: {
        values: ["Cash", "Card"],
        message: "Payment Method must be either Cash or Card",
      },
    },
    paymentInfo: { id: String, status: String },
    itemsPrice: { type: Number, required: [true, "Items Price is required"] },
    tax: { type: Number, required: [true, "Tax is required"] },
    shippingAmount: {
      type: Number,
      required: [true, "Shipping Amount is required"],
    },
    totalAmount: { type: Number, required: [true, "Total Amount is required"] },
    orderStatus: {
      type: String,
      default: "Processing",
      enum: {
        values: ["Processing", "Shipped", "Delivered"],
        message: "Order Status must be either Processing, Shipped or Delivered",
      },
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
