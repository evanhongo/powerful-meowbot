#!/usr/bin/env node
const color = require("picocolors");
const figures = require("figures");
const figlet = require("figlet");
const cliSelect = require("cli-select");

const getHotPostsFromPtt = require("../../utils/getHotPostsFromPtt.js");
const getTechNews = require("../../utils/getTechNews.js");
const getNewsFromIthome = require("../../utils/getNewsFromIthome.js");
const getNewsFromNewTalks = require("../../utils/getNewsFromNewTalks.js");

const main = async () => {
  const mainOptions = {
    values: ["八卦", "新聞", "科技", "沒了"],
    selected: color.red(figures.heart),
    unselected: "",
    valueRenderer: (value, selected) => {
      return selected ? color.underline(color.red(value)) : value;
    },
  };

  try {
    console.clear();
    console.log(
      color.red(figlet.textSync("Let's Meow", { horizontalLayout: "full" }))
    );
    let res;
    let fns;
    while (1) {
      console.log(color.red("你想知道什麼"));
      res = await cliSelect(mainOptions);
      switch (res.value) {
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
        default:
          process.exit(0);
      }
      console.clear();
      console.log(res);
      console.log(
        color.bgBlue(color.black(
          "------------------------------------------------------"
        ))
      );
    }
  } catch (err) {
    console.clear();
  }
};

main();
