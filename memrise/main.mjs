import config from "config";
import cheerio from "cheerio";
import fetch from "node-fetch";

import { getLatestDatapoint, createDatapoint } from "../beeminder-api/main.mjs";
const GOAL = config.get("memrise.beeminder.goal");
const USER = config.get("memrise.username");

const latestDatapoint = await getLatestDatapoint("memrises");
const page = await fetch(`https://app.memrise.com/user/${USER}`);
const html = await page.text();
const $ = cheerio.load(html);

const points = parseInt($(".profile-stats").children().eq(3).find("div").text().trim().replace(",", ""));

if (latestDatapoint.value !== points) {
  await createDatapoint(GOAL, {
    value: points,
  });
} else {
  console.log("Memrise :: no need to create datapoint for goal", GOAL);
}
process.exit();
