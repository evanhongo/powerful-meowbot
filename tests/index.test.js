import getHotPostsFromPtt from "../src/getHotPostsFromPtt.js";
import dotenv from "dotenv";
dotenv.config();

describe("api test", () => {
  test("it should get result from 'getHotPostsFromPtt' api", async () => {
    const res = await getHotPostsFromPtt();
    expect(res.split("\n").length).toEqual(40);
  });
});
