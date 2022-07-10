import { launch } from "puppeteer";
import parseHtmlContentFromBusinessNext from "./parser/parseHtmlContentFromBusinessNext.js";

const getNewsFromBusinessNext = async () => {
  try {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto('https://www.bnext.com.tw/articles/p/1', { waitUntil: 'networkidle0', timeout: 100000 });
    const htmlContent = await page.content();
    const posts = parseHtmlContentFromBusinessNext(htmlContent);
    
    try {
      await browser.close();
    }
    catch(err) {
      console.error(err)
    }

    return posts.join("\n");
  } catch (err) {
    throw Error(err);
  }
}

getNewsFromBusinessNext()

export default getNewsFromBusinessNext;