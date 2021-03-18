import getHtmlContent from "./getHtmlContent.js";
import parseHtmlContentFromYahoo from "./parser/parseHtmlContentFromYahoo.js";

const getHotNewsFromYahoo = async () => {
  try {
    const htmlContent = await getHtmlContent("https://tw.news.yahoo.com");
    const posts = parseHtmlContentFromYahoo(htmlContent);
    return posts.join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getHotNewsFromYahoo;
