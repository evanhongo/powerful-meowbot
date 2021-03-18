import cheerio from "cheerio";

const parseHtmlContentFromYahoo = (htmlContent) => {
  const $ = cheerio.load(htmlContent);
  const posts =
    $(".MostPopular")
      .children("ul")
      .first()
      .children()
      .map((i, elem) => {
        const target = $(elem).children("a").first();
        const title = target.text();
        return `${title}\n${target.attr("href")}`;
      })
      .get();
  return posts;
};

export default parseHtmlContentFromYahoo;
