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
let db, collection;
class Node {
  constructor(fn) {
    this.task = fn;
    this.next = null;
  }

  setNext(node) {
    this.next = node;
    return node;
  }

  getNext() {
    return this.next;
  }

  async handleRequest(req) {
    let tmpNode = this;
    let res;
    while (tmpNode && (res = await tmpNode.task(req)) === "hasNext") {
      tmpNode = tmpNode.getNext();
    }
    return res;
  }
}

const getSongsFromCache = async (category) => {
  if (cache.has(category)) return cache.get(category);
  else return "hasNext";
};

const getSongsFromMongo = async (category) => {
  try {
    console.info("Not found in cache");
    const mongoClient = mongodb.MongoClient;
    db = await mongoClient.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbo = db.db("meow-db");
    collection = dbo.collection("song");
    await collection.createIndex(
      { updatedAt: 1 },
      { expireAfterSeconds: 60 * 60 * 12 }
    );
    const songs = await collection.findOne({ category });
    const msg = songs?.info;
    if (msg) {
      db.close();
      cache.set(category, msg);
      return msg;
    } else return "hasNext";
  } catch (err) {
    throw Error(err);
  }
};

const getSongsFromThirdPartyApi = async (category) => {
  try {
    console.info("Not found in mongo");
    const res = await axios.get(process.env.KKBOX_URL, {
      params: {
        category: musicCategoryMap[category],
        lang: "tc",
        limit: 10,
        terr: "tw",
        type: "song",
      },
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
    const vedioIds = await getVedioIds(songInfos);
    const msg = songs
      .map(
        (song, i) =>
          `${song.song_name}\n${song.artist_name}\nhttps://www.youtube.com/watch?v=${vedioIds[i]}`
      )
      .join("\n");
    await collection.updateOne(
      { category },
      { $set: { category, info: msg, updatedAt: new Date() } },
      { upsert: true }
    );
    db.close();
    cache.set(category, msg);
    return msg;
  } catch (err) {
    throw Error(err);
  }
};

const getPopularSongs = async (category) => {
  //data source: cache => mongodb => third party api
  const node1 = new Node(getSongsFromCache);
  const node2 = new Node(getSongsFromMongo);
  const node3 = new Node(getSongsFromThirdPartyApi);
  node1.setNext(node2).setNext(node3);
  try {
    const songs = await node1.handleRequest(category);
    return songs;
  } catch (err) {
    throw Error(err);
  }
};

export default getPopularSongs;
