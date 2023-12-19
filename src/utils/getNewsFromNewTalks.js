const { default: fetch } = require("node-fetch");

const getNewsFromNewTalks = async () => {
  try {
    const fetch1 = fetch("https://forumapi.newtalk.tw/api/Article/ListQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        categoryNo: 1,
        page: 1,
        stopTopOrder: 1,
      }),
    });

    const fetch2 = fetch(
      "https://forumapi.newtalk.tw/api/Comment/QueryNewList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          categoryNo: 1,
        }),
      }
    );

    const resArr = await Promise.all([fetch1, fetch2]);
    const [res, res2] = await Promise.all(resArr.map((res) => res.json()));
    const posts = res.content.articleList
      .concat(res2.content.commentDetailList)
      .map((item) => `${item.articleTitle}\n${item.metaInfo.url}`);
    return posts.join("\n");
  } catch (err) {
    throw Error(err);
  }
};

module.exports = getNewsFromNewTalks;
