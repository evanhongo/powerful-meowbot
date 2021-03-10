import axios from "axios";

const getHtmlContent = async (url) => {
  try {
    const res = await axios.get(url);
    const { data: htmlContent } = res;
    return htmlContent;
  } catch (err) {
    throw Error(err);
  }
};

export default getHtmlContent;
