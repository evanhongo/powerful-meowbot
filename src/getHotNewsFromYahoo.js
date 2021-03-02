import cheerio from "cheerio";
import getHtmlContent from "./getHtmlContent.js";

const getHotNewsFromYahoo = async () => {
  try {
    const postIds = [];
    const htmlContent = await getHtmlContent(process.env.YAHOO_NEWS_URL);
    const $ = cheerio.load(htmlContent);
    $(".MostPopular")
      .children("ul")
      .first()
      .children()
      .each((i, elem) => {
        const target = $(elem).children("a").first();
        const title = target.text();
        postIds[i] = `${title}\n${target.attr("href")}`;
      });
    return postIds.join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getHotNewsFromYahoo;
