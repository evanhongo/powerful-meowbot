import getHtmlContent from "./getHtmlContent.js";
import parseHtmlContentFromIthome from "./parser/parseHtmlContentFromIthome.js";

const getNewsFromIthome = async () => {
  try {
    const htmlContent = await getHtmlContent("https://www.ithome.com.tw/news");
    const posts = parseHtmlContentFromIthome(htmlContent);
    return posts.join("\n");
  }
  catch (err) {
    throw Error(err);
  }
}

export default getNewsFromIthome;