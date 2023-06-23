const cheerio = require("cheerio");


const parseHtmlContentFromIthome = (htmlContent) => {
    const $ = cheerio.load(htmlContent);
    const target = $(".view-content").eq(0).find(".title").find("a");
    const title = target.text();
    const headlinePost = `${title}\nhttps://www.ithome.com.tw/${target.attr("href")}`
    const posts = $(".view-content").eq(1).children("div").map((i, elem) => {
        const target = $(elem).find(".title").find("a");
        const title = target.text();
        return `${title}\nhttps://www.ithome.com.tw/${target.attr("href")}`;
    }).get();
    posts.unshift(headlinePost);
    return posts;
}

module.exports = parseHtmlContentFromIthome;