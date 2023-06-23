const getHotPostsFromPtt = require("../../../../utils/getHotPostsFromPtt.js");
const getTechNews = require("../../../../utils/getTechNews.js");
const getNewsFromIthome = require("../../../../utils/getNewsFromIthome.js");
const getNewsFromNewTalks = require("../../../../utils/getNewsFromNewTalks.js");

const getLinebotResult = async (msg) => {
  let res;
  if (msg.includes("八卦")) {
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
    const fns = [getTechNews, getNewsFromIthome];
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

module.exports = getLinebotResult;
