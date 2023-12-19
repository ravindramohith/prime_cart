const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      public_id: { type: String },
      url: { type: String },
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

// Encrypting password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
