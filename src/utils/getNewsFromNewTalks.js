import getHtmlContent from "./getHtmlContent.js";
import parseHtmlContentFromNewTalks from "./parser/parseHtmlContentFromNewTalks.js";

const getNewsFromNewTalks = async () => {
  try {
    const htmlContent = await getHtmlContent("https://newtalk.tw/news/summary/today");
    const posts = parseHtmlContentFromNewTalks(htmlContent);
    return posts.join("\n");    
  }
  catch (err) {
    throw Error(err);
  }
}

export default getNewsFromNewTalks;