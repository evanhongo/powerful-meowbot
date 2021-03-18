import getHtmlContent from "./getHtmlContent.js";
import parseHtmlContentFromDQ from "./parser/parseHtmlContentFromDQ.js";

const getTodayPostsFromDQ = async () => {
  try {
    const htmlContent = await getHtmlContent("https://dq.yam.com");
    const posts = parseHtmlContentFromDQ(htmlContent);
    return posts.join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getTodayPostsFromDQ;
