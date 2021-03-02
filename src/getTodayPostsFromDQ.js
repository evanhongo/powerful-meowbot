import cheerio from "cheerio";
import getHtmlContent from "./getHtmlContent.js";

const getTodayPostsFromDQ = async () => {
  try {
    const postIds = [];
    const htmlContent = await getHtmlContent(process.env.DQ_URL);
    const $ = cheerio.load(htmlContent);
    $("ul.newsList")
      .children()
      .each((i, elem) => {
        const target = $(elem).children().first();
        const title = target.attr("title");
        postIds[i] = `${title}\nhttps://dq.yam.com${target.attr("href")}`;
      });
    return postIds.join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getTodayPostsFromDQ;
