const getHtmlContent = require("./getHtmlContent.js");
const parseHtmlContentFromTechNews = require("./parser/parseHtmlContentFromTechNews.js");

const getTechNews = async () => {
  try {
    const arr = new Array(4).fill(0);
    const posts =
      (await Promise.all(arr.map(async (p, i) => {
        const htmlContent = await getHtmlContent(`http://technews.tw/page/${i + 1}`);
        const posts = parseHtmlContentFromTechNews(htmlContent);
        return posts;
      })))
        .reduce((acc, val) => acc.concat(val), []);
    return posts.join("\n");
  }
  catch (err) {
    throw Error(err);
  }
}

module.exports = getTechNews;