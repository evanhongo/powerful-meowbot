import axios from "axios";
import NodeCache from "node-cache";
import getMusicVedioIds from "./getMusicVedioIds.js";

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

const getPopularMusic = async (category) => {
  if (cache.has(category)) return cache.get(category);
  else {
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
    const vedioIds = await getMusicVedioIds(songInfos);

    const msg = songs
      .map(
        (song, i) =>
          `${song.song_name}\n${song.artist_name}\nhttps://www.youtube.com/watch?v=${vedioIds[i]}`
      )
      .join("\n");

    cache.set(category, msg);
    return msg;
  }
};

export default getPopularMusic;
