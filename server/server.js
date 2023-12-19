const dotenv = require("dotenv");
const mongoose = require("mongoose");

// An "uncaught error" in JavaScript refers to an error that occurs during the execution of a script, but there is no surrounding try-catch block or error-handling mechanism to handle the error.
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "server/config.env" });
}

const server = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connection) =>
    console.log(`MongoDB connected with host: ${connection.connection.host}`)
  )
  .catch((e) => console.log(`MongoDB connect error: ${e}`));

server.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server listening on port ${process.env.PORT || 4000} | Environment: ${
      process.env.NODE_ENV
    }`
  );
});

// An "unhandled rejection" error in JavaScript occurs when a Promise is rejected, and there is no catch or reject handler to handle the rejection.
// Example: MongoDB connection error.
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
