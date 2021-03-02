import cheerio from "cheerio";
import getHtmlContent from "./getHtmlContent.js";

const getHotPostsFromPtt = async () => {
  try {
    const postIds = [];
    const htmlContent = await getHtmlContent(process.env.PTT_URL);
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
