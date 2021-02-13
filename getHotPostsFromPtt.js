import axios from "axios";
import cheerio from "cheerio";

const getHotPostsFromPtt = async () => {
  const res = await axios.get(process.env.PTT_URL);
  const { data: htmlContent } = res;
  const postIds = [];

  const $ = cheerio.load(htmlContent);
  $("a.e7-article-default").each((i, elem) => {
    postIds[i] = `https://www.pttweb.cc${$(elem).attr("href")}`;
  });
  return postIds.slice(0, 20);
};

export default getHotPostsFromPtt;
