const express = require("express");
const dotenv = require("dotenv");

const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "server/config.env" });
}

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server listening on port ${process.env.PORT || 4000} | Environment: ${
      process.env.NODE_ENV
    }`
  );
});
