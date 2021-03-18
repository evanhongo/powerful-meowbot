import cheerio from "cheerio";

const parseHtmlContentFromDQ = (htmlContent) => {
  const $ = cheerio.load(htmlContent);
  const posts =
    $("ul.newsList")
      .children()
      .map((i, elem) => {
        const target = $(elem).children().first();
        const title = target.attr("title");
        return `${title}\nhttps://dq.yam.com${target.attr("href")}`;
      })
      .get();
  return posts;
};

export default parseHtmlContentFromDQ;
