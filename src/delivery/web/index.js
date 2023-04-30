import express from "express";
import dotenv from "dotenv";

import lineMsgHandler from "./routes/line/lineMsgHandler.js";

dotenv.config();

const startupServer = async () => {
  const app = express();

  app.get("/ping", (_, res) => {
    res.send("pong");
  });

  app.post("/linewebhook", lineMsgHandler);
  app.listen(process.env.PORT || 3000, function () {
    console.log("MeowBot is working!");
  });


};

startupServer();
