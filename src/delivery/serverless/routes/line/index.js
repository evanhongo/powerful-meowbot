const express = require("express");
const line = require('@line/bot-sdk');

const getLinebotResult = require("./getLinebotResult.js");

const config = {
    channelSecret: process.env.LINEBOT_CHANNEL_SECRET,
    channelAccessToken: process.env.LINEBOT_CHANNEL_ACCESS_TOKEN,
}

const client = new line.Client(config);
const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    const msg = event.message.text;
    const res = await getLinebotResult(msg).catch((err) => null);
    if (res) {
        const lines = res.split("\n");
        const replyNum = Math.ceil(lines.length / 60);
        const replyMsgArr = [];
        for (let i = 0; i < replyNum; i++)
            replyMsgArr[i] = { type: "text", text: lines.slice(i * 60, i * 60 + 60).join("\n") };
        return client.replyMessage(event.replyToken, replyMsgArr);
    }
}

const lineMsgHandler = (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
}


const router = express.Router();
router.post("/linewebhook", line.middleware(config), lineMsgHandler)


module.exports = router;