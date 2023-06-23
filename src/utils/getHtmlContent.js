const { default: fetch } = require("node-fetch");

const getHtmlContent = async (url) => {
  try {
    const res = await fetch(url);
    const htmlContent = await res.text();
    return htmlContent;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = getHtmlContent;
