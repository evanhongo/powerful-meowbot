#!/usr/bin/env node
import chalk from "chalk";
import figures from "figures";
import figlet from "figlet";
import cliSelect from "cli-select";
import dotenv from "dotenv";
import getPopularSongs from "../../utils/getPopularSongs.js";
import getHotPostsFromPtt from "../../utils/getHotPostsFromPtt.js";
import getTodayPostsFromDQ from "../../utils/getTodayPostsFromDQ.js";
import getNewsFromBusinessNext from "../../utils/getNewsFromBusinessNext.js";
import getTechNews from "../../utils/getTechNews.js";
import getNewsFromIthome from "../../utils/getNewsFromIthome.js";
import getNewsFromNewTalks from "../../utils/getNewsFromNewTalks.js";

dotenv.config();

const mainOptions = {
  values: ["八卦", "新聞", "科技", "音樂"],
  selected: chalk.red(figures.heart),
  unselected: "",
  valueRenderer: (value, selected) => {
    return selected ? chalk.red.underline(value) : value;
  },
};

const musicOptions = {
  values: [
    "華語",
    "台語",
    "日語",
    "西洋",
    "電子",
    "R&B",
    "嘻哈",
    "搖滾",
    "爵士",
    "雷鬼",
  ],
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
          fns = [
            getNewsFromNewTalks
          ];
          res = await Promise.all(
            fns.map(async (fn) => {
              return await fn();
            })
          );
          res = res?.join("\n");
          break;
        case "科技":
          fns = [getNewsFromBusinessNext, getTechNews, getNewsFromIthome];
          res = await Promise.all(
            fns.map(async (fn) => {
              return await fn();
            })
          );
          res = res?.join("\n");
          break;
        case "音樂":
          console.log(chalk.red("你想聽什麼類型的音樂"));
          res = await cliSelect(musicOptions);
          res = await getPopularSongs(res?.value);
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
