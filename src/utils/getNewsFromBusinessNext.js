import axios from "axios";

const getNewsFromBusinessNext = async () => {
  try {
    const arr = new Array(4).fill(0);
    const posts =
      (await Promise.all(arr.map(async (p, i) => {
        const res = await axios.post(`https://www.bnext.com.tw/api/article/list`, { page: `${i + 1}` });
        let { data: { data: { data: posts } } } = res;
        posts = posts.map(post => `${post.title}\n${post.real_link}`);
        return posts.join("\n");
      })))
        .reduce((acc, val) => acc.concat(val), []);
    return posts.join("\n");
  }
  catch (err) {
    throw Error(err);
  }
}

export default getNewsFromBusinessNext;