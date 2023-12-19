const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
      select: false,
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

// Get JWT
userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetPasswordToken = crypto.randomBytes(20).toString("hex");

  //hash and set it to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");
  this.resetPasswordTokenExpires =
    Date.now() + process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN * 60 * 1000;

  return resetPasswordToken;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
