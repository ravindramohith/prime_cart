const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      maxLength: [8, "Product price cannot exceed 8 digits"],
      min: [0, "Product price cannot be less than 0"],
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Product ratings cannot be less than 0"],
    },
    images: [
      {
        public_id: { type: String, required: [true, "public_id is required"] },
        url: { type: String, required: [true, "url is required"] },
      },
    ],
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message:
          'Product category must be either "Electronics" or "Cameras" or "Laptops" or "Accessories" or "Headphones" or "Food" or "Sports" or "Outdoor" or "Home" or "Books"',
      },
    },
    seller: {
      type: String,
      required: [true, "Product seller is required"],
      maxLength: [100, "Product seller cannot exceed 100 characters"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Product stock cannot be less than 0"],
    },
    numOfReviews: {
      type: Number,
      min: [0, "Number of reviews cannot be less than 0"],
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "User is required for a review"],
        },
        rating: {
          type: Number,
          required: [true, "Rating is required for a review"],
          min: [0, "Rating cannot be less than 0"],
          max: [5, "Rating cannot be more than 5"],
        },
        comment: {
          type: String,
          required: [true, "Comment is required for a review"],
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
