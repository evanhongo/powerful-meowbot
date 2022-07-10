import getHtmlContent from "./getHtmlContent.js";
import parseHtmlContentFromPtt from "./parser/parseHtmlContentFromPtt.js";

const getHotPostsFromPtt = async () => {
  try {
    const htmlContent = await getHtmlContent(
      "https://www.pttweb.cc/hot/all/today"
    );
    const posts = parseHtmlContentFromPtt(htmlContent);
    return posts.slice(0, 30).join("\n");
  } catch (err) {
    throw Error(err);
  }
};

export default getHotPostsFromPtt;