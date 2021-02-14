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
  //data flow: cache => mongodb => third party api
  let msg;
  if (cache.has(category)) return cache.get(category);
  else {
    const mongoClient = mongodb.MongoClient;
    const db = await mongoClient
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((err) => {
        db.close();
        throw Error(err);
      });
    const dbo = db.db("meow-db");
    const collection = dbo.collection("song");
    await collection
      .createIndex({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 12 })
      .catch((err) => {
        console.error(err);
      });
    const songs = await collection.findOne({ category }).catch((err) => {
      db.close();
      throw Error(err);
    });
    msg = songs?.info;
    if (!msg) {
      console.info("Not found in mongo");
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

      const vedioIds = await getVedioIds(songInfos).catch((err) => {
        throw Error(err);
      });

      msg = songs
        .map(
          (song, i) =>
            `${song.song_name}\n${song.artist_name}\nhttps://www.youtube.com/watch?v=${vedioIds[i]}`
        )
        .join("\n");

      collection.updateOne(
        { category },
        { $set: { category, info: msg, updatedAt: new Date() } },
        { upsert: true }
      );
    }
    cache.set(category, msg);
    return msg;
  }
};

export default getPopularSongs;
