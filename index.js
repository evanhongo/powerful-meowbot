import axios from "axios";
import cheerio from "cheerio";
import express from "express";
import linebot from "linebot";
import dotenv from "dotenv";
dotenv.config();

const musicCategoryMap = {
  華語: 297,
  台語: 304,
  日語: 308,
  西洋: 390,
  電子: 325,
  "R&B": 335,
  嘻哈: 324,
  搖滾: 13,
  爵士: 69,
  雷鬼: 348,
};
const musicCategory = [
  "華語",
  "台語",
  "日語",
  "西洋",
  "電子",
  "R&B",
  "嘻哈",
  "搖滾",
  "爵士",
  "雷鬼",
];

const getMusicVedioIds = async (songNames) => {
  const videoIds = await Promise.all(
    songNames.map(async (songName) => {
      const res = await axios.get(process.env.YOUTUBE_DATA_API_URI, {
        params: {
          key: process.env.YOUTUBE_DATA_API_KEY,
          type: "video",
          maxResults: 1,
          q: songName,
        },
      });

      const {
        data: { items },
      } = res;

      return items[0].id.videoId;
    })
  );
  return videoIds;
};

const getPopularMusic = async (category) => {
  const res = await axios.get(process.env.KKBOX_URL, {
    params: {
      category: musicCategoryMap[category],
      lang: "tc",
      limit: 3,
      terr: "tw",
      type: "song",
    },
  });

  const {
    data: {
      data: {
        charts: { song: songList },
      },
    },
  } = res;

  const songNames = songList.map((song) => song.song_name);
  const vedioIds = await getMusicVedioIds(songNames);

  return songList.map(
    (song, i) =>
      `${song.song_name}\t${song.artist_name}\nhttps://www.youtube.com/watch?v=${vedioIds[i]}`
  );
};

var bot = linebot({
  channelId: process.env.LINEBOT_CHANNEL_ID,
  channelSecret: process.env.LINEBOT_CHANNEL_SECRET,
  channelAccessToken: process.env.LINEBOT_CHANNEL_ACCESS_TOKEN,
});

bot.on("message", async (event) => {
  if (event.message.type === "text") {
    let res;
    const msg = event.message.text;
    if (msg.includes("音樂")) {
      for (let category of musicCategory) {
        if (msg.includes(category)) {
          res = await getPopularMusic(category).catch((err) => "忙碌中");
          break;
        }
      }
    }

    event.reply(res);
  }
});

const app = express();
app.get("/ping", (req, res) => {
  res.send("pong");
});

const linebotParser = bot.parser();
app.post("/linewebhook", linebotParser);
app.listen(process.env.PORT || 3000, function () {
  console.log("MeowBot is running.");
});
