import cheerio from "cheerio";

const parseHtmlContentFromNewTalks = (htmlContent) => {
    const $ = cheerio.load(htmlContent);    
    const posts = $(".news-list-item").map((i, elem) => {
        const title = $(elem).find(".news_title").text().trim();
        const link = $(elem).find(".newsBox").attr("href");
        return `${title}\n${link}`;
    }).get();
    
    return posts;
}

export default parseHtmlContentFromNewTalks;