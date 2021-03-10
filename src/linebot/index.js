import express from "express";
import linebot from "linebot";
import dotenv from "dotenv";
import getLinebotResult from "./getLinebotResult.js";

dotenv.config();

const startupServer = async () => {
  const bot = linebot({
    channelId: process.env.LINEBOT_CHANNEL_ID,
    channelSecret: process.env.LINEBOT_CHANNEL_SECRET,
    channelAccessToken: process.env.LINEBOT_CHANNEL_ACCESS_TOKEN,
  });

  bot.on("message", async (event) => {
    if (event.message.type === "text") {
      const msg = event.message.text;
      const res = await getLinebotResult(msg).catch((err) => null);
      if (res) event.reply(res);
    }
  });

  const app = express();

  const linebotParser = bot.parser();
  app.post("/linewebhook", linebotParser);
  app.listen(process.env.PORT || 3000, function () {
    console.log("MeowBot is running.");
  });

  app.get("/", (req, res) => {
    res.send("Hello World");
  });
};

startupServer();
