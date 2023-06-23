const cheerio = require("cheerio");

const parseHtmlContentFromNewTalks = (htmlContent) => {
    const $ = cheerio.load(htmlContent);
    const posts = $(".news-list-item").map((i, elem) => {
        const title = $(elem).find(".news_title").text().trim();
        const link = $(elem).find("a.trackGA").first().attr("href");
        return `${title}\n${link}`;
    }).get();

    return posts.slice(0, 90);
}

module.exports = parseHtmlContentFromNewTalks;