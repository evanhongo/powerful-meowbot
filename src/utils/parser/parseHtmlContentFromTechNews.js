const cheerio = require("cheerio");

const parseHtmlContentFromTechNews = (htmlContent) => {
    const $ = cheerio.load(htmlContent);
    const posts =
        $("#content")
            .children("article")
            .map((i, elem) => {
                const target = $(elem).find("a");
                return `${target.attr("title")}\n${target.attr("href")}`;
            })
            .get();
    return posts;
}

module.exports = parseHtmlContentFromTechNews;