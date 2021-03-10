import parseHtmlContentFromDQ from "../src/utils/parser/parseHtmlContentFromDQ.js";
import parseHtmlContentFromPtt from "../src/utils/parser/parseHtmlContentFromPtt.js";
import parseHtmlContentFromYahoo from "../src/utils/parser/parseHtmlContentFromYahoo.js";

const htmlContent1 =
  "\
<ul class='newsList' >\
  <li>\
   <a title='test' href='https://test.com'/>\
  <li>\
</ul>";

const htmlContent2 =
  "\
<div>\
  <a class='e7-article-default' href='https://test.com'>\
    <div>\
      <p>test</p>\
    </div>\
  </a>\
  <a class='e7-article-default' href='https://test.com'>\
    <div>\
      <p>test</p>\
    </div>\
  </a>\
</div>\
";

const htmlContent3 =
  "\
<div class='MostPopular'>\
  <ul>\
    <li>\
      <a href='https://test.com'>test</a>\
    </li>\
    <li>\
      <a href='https://test.com'/>test</a>\
    </li>\
    <li>\
      <a href='https://test.com'/>test</a>\
    </li>\
  </ul>\
</div>\
";

describe("test parser", () => {
  test("it should get post ids from 'parseHtmlContentFromDQ'", () => {
    expect(parseHtmlContentFromDQ(htmlContent1).length).toBeLessThanOrEqual(10);
  });

  test("it should get post ids from 'parseHtmlContentFromPtt'", () => {
    expect(parseHtmlContentFromPtt(htmlContent2).length).toBe(2);
  });

  test("it should get post ids from 'getHotNewsFromYahoo'", () => {
    expect(parseHtmlContentFromYahoo(htmlContent3).length).toBe(3);
  });
});
