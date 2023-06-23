const getHtmlContent = require("./getHtmlContent.js");
const parseHtmlContentFromPtt = require("./parser/parseHtmlContentFromPtt.js");

const getHotPostsFromPtt = async () => {
  try {
    const htmlContent = await getHtmlContent(
      "http://www.pttweb.cc/hot/all/today"
    );
    const posts = parseHtmlContentFromPtt(htmlContent);
    return posts.slice(0, 30).join("\n");
  } catch (err) {
    throw Error(err);
  }
};

module.exports = getHotPostsFromPtt;
