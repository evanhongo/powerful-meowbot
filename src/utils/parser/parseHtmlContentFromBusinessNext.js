import cheerio from "cheerio";

const parseHtmlContentFromBusinessNext = (htmlContent) => {
  const $ = cheerio.load(htmlContent);
  const posts =
    $(".MobileBox.px-1")
        .map((i, elem) => {
            const title = $(elem).find(".font-weight-bold").text().trim();
            const link = `https://www.bnext.com.tw${$(elem).children("a").first().attr("href")}`;          
            return `${title}\n${link}`;
        })
        .get();
   
  return posts;
};

export default parseHtmlContentFromBusinessNext;
