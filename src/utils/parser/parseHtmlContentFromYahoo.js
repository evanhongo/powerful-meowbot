import cheerio from "cheerio";

const parseHtmlContentFromYahoo = (htmlContent) => {
  const postIds = [];
  const $ = cheerio.load(htmlContent);
  $(".MostPopular")
    .children("ul")
    .first()
    .children()
    .each((i, elem) => {
      const target = $(elem).children("a").first();
      const title = target.text();
      postIds[i] = `${title}\n${target.attr("href")}`;
    });
  return postIds;
};

export default parseHtmlContentFromYahoo;
