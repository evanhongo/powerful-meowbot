import cheerio from "cheerio";

const parseHtmlContentFromDQ = (htmlContent) => {
  const postIds = [];
  const $ = cheerio.load(htmlContent);
  $("ul.newsList")
    .children()
    .each((i, elem) => {
      const target = $(elem).children().first();
      const title = target.attr("title");
      postIds[i] = `${title}\nhttps://dq.yam.com${target.attr("href")}`;
    });
  return postIds;
};

export default parseHtmlContentFromDQ;
