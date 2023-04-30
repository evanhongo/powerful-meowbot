import getPopularSongs from "../../../../utils/getPopularSongs.js";
import getHotPostsFromPtt from "../../../../utils/getHotPostsFromPtt.js";
import getTodayPostsFromDQ from "../../../../utils/getTodayPostsFromDQ.js";
import getNewsFromBusinessNext from "../../../../utils/getNewsFromBusinessNext.js";
import getTechNews from "../../../../utils/getTechNews.js";
import getNewsFromIthome from "../../../../utils/getNewsFromIthome.js";
import getNewsFromNewTalks from "../../../../utils/getNewsFromNewTalks.js";

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

const getLinebotResult = async (msg) => {
  let res;
  if (msg.includes("音樂")) {
    for (let category of musicCategory) {
      if (msg.includes(category)) {
        res = await getPopularSongs(category).catch((err) => {
          console.error(err);
          return null;
        });
        break;
      }
    }
  }
  else if (msg.includes("八卦")) {
    res = await getHotPostsFromPtt().catch((err) => {
      console.error(err);
      return null;
    });
  }
  else if (msg.includes("新聞")) {
    const fns = [getNewsFromNewTalks];
    res = await Promise.all(
      fns.map(async (fn) => {
        return await fn();
      })
    ).catch((err) => {
      console.error(err);
      return null;
    });
    res = res?.join("\n");
  }
  else if (msg.includes("科技")) {
    const fns = [getNewsFromBusinessNext, getTechNews, getNewsFromIthome];
    res = await Promise.all(
      fns.map(async (fn) => {
        return await fn();
      })
    ).catch((err) => {
      console.error(err);
      return null;
    });
    res = res?.join("\n");
  }
  return res;
};

export default getLinebotResult;
