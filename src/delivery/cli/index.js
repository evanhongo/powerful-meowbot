#!/usr/bin/env node
const chalk = require("chalk");
const figures = require("figures");
const figlet = require("figlet");
const cliSelect = require("cli-select");

const getHotPostsFromPtt = require("../../utils/getHotPostsFromPtt.js");
const getTechNews = require("../../utils/getTechNews.js");
const getNewsFromIthome = require("../../utils/getNewsFromIthome.js");
const getNewsFromNewTalks = require("../../utils/getNewsFromNewTalks.js");

const mainOptions = {
  values: ["八卦", "新聞", "科技"],
  selected: chalk.red(figures.heart),
  unselected: "",
  valueRenderer: (value, selected) => {
    return selected ? chalk.red.underline(value) : value;
  },
};

const sleep = (t) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });

const start = async () => {
  try {
    await sleep(1);
    console.clear();
    console.log(
      chalk.yellow(figlet.textSync("Let's Meow", { horizontalLayout: "full" }))
    );
    let res = 1;
    let fns;
    while (res) {
      console.log(chalk.red("你想知道什麼"));
      res = await cliSelect(mainOptions);
      switch (res?.value) {
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
      console.log(
        chalk.bgBlue.black(
          "------------------------------------------------------"
        )
      );
    }
  } catch (err) {
    console.clear();
  }
};

start();
