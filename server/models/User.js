const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      maxLength: [50, "User Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxLength: [8, "Password cannot exceed 8 characters"],
    },
    avatar: {
      public_id: { type: String, required: [true, "public_id is required"] },
      url: { type: String, required: [true, "url is required"] },
    },
    role: {
      type: String,
      required: [true, "User Role is required"],
      enum: {
        values: ["admin", "user"],
        message: 'User Role must be either "admin" or "user"',
      },
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
