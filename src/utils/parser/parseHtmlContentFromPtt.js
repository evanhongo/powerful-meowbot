import cheerio from "cheerio";

const parseHtmlContentFromPtt = (htmlContent) => {
  const postIds = [];
  const $ = cheerio.load(htmlContent);
  $("a.e7-article-default").each((i, elem) => {
    const title = $(elem).children().first().children().first().text();
    postIds[i] = `${title}\nhttps://www.pttweb.cc${$(elem).attr("href")}`;
  });
  return postIds;
};

export default parseHtmlContentFromPtt;
