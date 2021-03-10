import getHtmlContent from "./getHtmlContent.js";
import parseHtmlContentFromYahoo from "./parser/parseHtmlContentFromYahoo.js";

const getHotNewsFromYahoo = async () => {
  try {
    const htmlContent = await getHtmlContent("https://tw.news.yahoo.com");
    const postIds = parseHtmlContentFromYahoo(htmlContent);
    return postIds.join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getHotNewsFromYahoo;
