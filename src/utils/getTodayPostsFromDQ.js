import getHtmlContent from "./getHtmlContent.js";
import parseHtmlContentFromDQ from "./parser/parseHtmlContentFromDQ.js";

const getTodayPostsFromDQ = async () => {
  try {
    const htmlContent = await getHtmlContent("https://dq.yam.com");
    const postIds = parseHtmlContentFromDQ(htmlContent);
    return postIds.join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getTodayPostsFromDQ;
