import axios from "axios";
import NodeCache from "node-cache";
import mongodb from "mongodb";
import getVedioIds from "./getVedioIds.js";

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

const cache = new NodeCache({ stdTTL: 60 * 60 * 6 });

const getPopularSongs = async (category) => {
  if (cache.has(category)) return cache.get(category);
  else {
    const res = await axios
      .get(process.env.KKBOX_URL, {
        params: {
          category: musicCategoryMap[category],
          lang: "tc",
          limit: 3,
          terr: "tw",
          type: "song",
        },
      })
      .catch((err) => {
        throw Error(err);
      });

    const {
      data: {
        data: {
          charts: { song: songs },
        },
      },
    } = res;

    const songInfos = songs.map((song) => ({
      name: song.song_name,
      artist: song.artist_name,
    }));

    const mongoClient = mongodb.MongoClient;
    const db = await mongoClient
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((err) => {
        throw Error(err);
      });
    const dbo = db.db("meow-db");
    const collection = dbo.collection("song");

    const vedioIds = await getVedioIds(songInfos).catch((err) => null);

    let msg;
    if (!vedioIds) {
      const songs = await collection.findOne({ category }).catch((err) => {
        throw Error(err);
      });

      if (!songs) throw Error("Not found in mongo!");

      msg = songs.info;
    } else {
      msg = songs
        .map(
          (song, i) =>
            `${song.song_name}\n${song.artist_name}\nhttps://www.youtube.com/watch?v=${vedioIds[i]}`
        )
        .join("\n");

      collection.updateOne(
        { category },
        { category, info: msg },
        { upsert: true }
      );

      cache.set(category, msg);
    }

    db.close();
    return msg;
  }
};

export default getPopularSongs;
