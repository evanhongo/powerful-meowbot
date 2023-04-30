import linebot from "linebot";

import getLinebotResult from "./getLinebotResult.js";

const bot = linebot({
    channelId: process.env.LINEBOT_CHANNEL_ID,
    channelSecret: process.env.LINEBOT_CHANNEL_SECRET,
    channelAccessToken: process.env.LINEBOT_CHANNEL_ACCESS_TOKEN,
});

bot.on("message", async (event) => {
    if (event.message.type === "text") {
        const msg = event.message.text;
        const res = await getLinebotResult(msg).catch((err) => null);
        if (res) {
            const lines = res.split("\n");
            const replyNum = Math.ceil(lines.length / 60);
            const replyMsgArr = [];
            for (let i = 0; i < replyNum; i++)
                replyMsgArr[i] = { type: "text", text: lines.slice(i * 60, i * 60 + 60).join("\n") };
            event.reply(replyMsgArr);
        }
    }
});

const lineMsgHandler = bot.parser();

export default lineMsgHandler;