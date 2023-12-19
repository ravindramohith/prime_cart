const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "server/config.env" });
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connection) =>
    console.log(`MongoDB connected with host: ${connection.connection.host}`)
  )
  .catch((e) => console.log(`MongoDB connect error: ${e}`));

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server listening on port ${process.env.PORT || 4000} | Environment: ${
      process.env.NODE_ENV
    }`
  );
});
