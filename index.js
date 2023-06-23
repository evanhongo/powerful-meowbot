const serverless = require("serverless-http");
const express = require("express");

const lineRouter = require("./src/delivery/serverless/routes/line");

const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello World",
  });
});

app.use("/", lineRouter)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
