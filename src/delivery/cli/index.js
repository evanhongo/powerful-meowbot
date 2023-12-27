#!/usr/bin/env node
const color = require("picocolors");
const figlet = require("figlet");
const p = require("@clack/prompts")

const getHotPostsFromPtt = require("../../utils/getHotPostsFromPtt.js");
const getTechNews = require("../../utils/getTechNews.js");
const getNewsFromIthome = require("../../utils/getNewsFromIthome.js");
const getNewsFromNewTalks = require("../../utils/getNewsFromNewTalks.js");

const main = async () => {
  const question = {
    message: "你想知道什麼?",
    initialValue: "1",
    options: [{ value: "八卦", label: "八卦" }, { value: "新聞", label: "新聞" }, { value: "科技", label: "科技" }]
  };

  try {
    console.clear();
    console.log(
      color.red(figlet.textSync("Let's Meow", { horizontalLayout: "full" }))
    );
    let res;
    let fns;

    p.intro(color.red("Let's Meow ~"));
    while (1) {
      res = await p.select(question);
      switch (res) {
        case "八卦":
          res = await getHotPostsFromPtt();
          break;
        case "新聞":
          fns = [getNewsFromNewTalks];
          res = await Promise.all(
            fns.map(async (fn) => {
              return await fn();
            })
          );
          res = res?.join("\n");
          break;
        case "科技":
          fns = [getTechNews, getNewsFromIthome];
          res = await Promise.all(
            fns.map(async (fn) => {
              return await fn();
            })
          );
          res = res?.join("\n");
          break;
      }
      console.clear();
      console.log(res);
    }
  } catch (err) {
    console.clear();
  }
};

main();