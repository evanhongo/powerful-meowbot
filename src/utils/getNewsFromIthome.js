const getHtmlContent = require("./getHtmlContent.js");
const parseHtmlContentFromIthome = require("./parser/parseHtmlContentFromIthome.js");

const getNewsFromIthome = async () => {
  try {
    const htmlContent = await getHtmlContent("http://www.ithome.com.tw/news");
    const posts = parseHtmlContentFromIthome(htmlContent);
    return posts.join("\n");
  }
  catch (err) {
    throw Error(err);
  }
}

module.exports = getNewsFromIthome;