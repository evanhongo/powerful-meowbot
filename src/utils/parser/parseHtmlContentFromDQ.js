import cheerio from "cheerio";

const parseHtmlContentFromDQ = (htmlContent) => {
  const $ = cheerio.load(htmlContent);
  const posts =
    $("article.inIndex")
      .map((i, elem) => {
        const target = $(elem).find(".post__link--title");
        const title = target.text().trim();
        const link = `https://dq.yam.com${target.attr("href")}`;
        return `${title}\n${link}`;
      })
      .get();
  return posts;
};

export default parseHtmlContentFromDQ;
