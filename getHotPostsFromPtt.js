import axios from "axios";
import cheerio from "cheerio";

const getHotPostsFromPtt = async () => {
  try {
    const res = await axios.get(process.env.PTT_URL);
    const { data: htmlContent } = res;
    const postIds = [];
    const $ = cheerio.load(htmlContent);
    $("a.e7-article-default").each((i, elem) => {
      const title = $(elem).children().first().children().first().text();
      postIds[i] = `${title}\nhttps://www.pttweb.cc${$(elem).attr("href")}`;
    });
    return postIds.slice(0, 20).join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getHotPostsFromPtt;
