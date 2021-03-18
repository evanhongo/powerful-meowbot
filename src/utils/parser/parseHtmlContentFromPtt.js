import cheerio from "cheerio";

const parseHtmlContentFromPtt = (htmlContent) => {
  const $ = cheerio.load(htmlContent);
  const posts =
    $("a.e7-article-default")
      .map((i, elem) => {
        const title = $(elem).children().first().children().first().text();
        return `${title}\nhttps://www.pttweb.cc${$(elem).attr("href")}`;
      })
      .get();
  return posts;
};

export default parseHtmlContentFromPtt;
