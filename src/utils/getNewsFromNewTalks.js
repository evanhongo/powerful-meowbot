const getHtmlContent = require("./getHtmlContent.js");
const parseHtmlContentFromNewTalks = require("./parser/parseHtmlContentFromNewTalks.js");

const getNewsFromNewTalks = async () => {
  try {
    const htmlContent = await getHtmlContent("http://newtalk.tw/news/summary/today");
    const posts = parseHtmlContentFromNewTalks(htmlContent);
    return posts.join("\n");
  }
  catch (err) {
    throw Error(err);
  }
}

module.exports = getNewsFromNewTalks;