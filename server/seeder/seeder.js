const Product = require("../models/Product");
const mongoose = require("mongoose");
const { products } = require("./data");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/config.env" });
}

const fillProducts = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error while connecting to MongoDB: ", err))
    .finally(async () => {
      await Product.insertMany(products)
        .then(() => console.log("Products Added successfully"))
        .catch((err) => console.log("Error while inserting products: ", err))
        .finally(() => process.exit(0));
    });
};

const deleteProducts = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error while connecting to MongoDB: ", err))
    .finally(async () => {
      await Product.deleteMany()
        .then(() => console.log("Products Deleted successfully"))
        .catch((err) => console.log("Error while deleting Data: ", err))
        .finally(() => process.exit(0));
    });
};

const refillProducts = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error while connecting to MongoDB: ", err))
    .finally(async () => {
      await Product.deleteMany()
        .then(() => console.log("Products Deleted successfully"))
        .catch((err) => console.log("Error while deleting Product: ", err))
        .finally(async () => {
          await Product.insertMany(products)
            .then(() => console.log("Products Added successfully"))
            .catch((err) =>
              console.log("Error while inserting products: ", err)
            )
            .finally(() => process.exit(0));
        });
    });
};

console.log("Connecting to MongoDB..");
if (process.argv[2] == "--fill") {
  fillProducts();
} else if (process.argv[2] == "--delete") {
  deleteProducts();
} else if (process.argv[2] == "--refill") {
  refillProducts();
}
