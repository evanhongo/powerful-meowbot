#!/usr/bin/env node
import chalk from "chalk";
import figures from "figures";
import figlet from "figlet";
import cliSelect from "cli-select";
import dotenv from "dotenv";
import getPopularSongs from "../utils/getPopularSongs.js";
import getHotPostsFromPtt from "../utils/getHotPostsFromPtt.js";
import getHotNewsFromYahoo from "../utils/getHotNewsFromYahoo.js";
import getTodayPostsFromDQ from "../utils/getTodayPostsFromDQ.js";

dotenv.config();

const mainOptions = {
  values: ["時事", "音樂"],
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
      chalk.yellow(figlet.textSync("Web Crawler", { horizontalLayout: "full" }))
    );
    let res = 1;
    while (res) {
      console.log("你想知道什麼");
      res = await cliSelect(mainOptions);
      switch (res?.value) {
        case "時事":
          console.clear();
          const fns = [
            getHotPostsFromPtt,
            getHotNewsFromYahoo,
            getTodayPostsFromDQ,
          ];
          res = await Promise.all(
            fns.map(async (fn) => {
              return await fn();
            })
          );
          res = res?.join("\n");
          break;
        case "音樂":
          console.clear();
          console.log("你想聽什麼類型的音樂");
          res = await cliSelect(musicOptions);
          res = await getPopularSongs(res?.value);
          break;
      }
      console.log(res);
      console.log(
        chalk.bgBlue.black(
          "------------------------------------------------------"
        )
      );
    }
  } catch (e) {
    console.clear();
    console.log(e);
  }
};

start();
