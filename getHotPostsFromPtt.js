import axios from "axios";
import cheerio from "cheerio";

const getHotPostsFromPtt = async () => {
  let htmlContent, errMsg;
  await axios
    .get(process.env.PTT_URL)
    .then((res) => {
      htmlContent = res.data;
    })
    .catch((err) => {
      errMsg = err;
    });

  if (errMsg) throw Error(errMsg);

  const postIds = [];
  const $ = cheerio.load(htmlContent);
  $("a.e7-article-default").each((i, elem) => {
    const title = $(elem).children().first().children().first().text();
    postIds[i] = `${title}\nhttps://www.pttweb.cc${$(elem).attr("href")}`;
  });
  return postIds.slice(0, 20).join("\n");
};

export default getHotPostsFromPtt;
