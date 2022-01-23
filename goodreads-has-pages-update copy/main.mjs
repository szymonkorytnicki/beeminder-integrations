/**
 * Check if user had bumped "pages read" today
 */
import config from "config";
import rssToJson from "rss-to-json";
const { parse } = rssToJson;
import { hasUpdateToday } from "./utils.mjs";
import { hasDatapointToday, createDatapoint } from "../beeminder-api/main.ts";

const GOAL = config.get("goodreads.beeminder.goal");
const USER_ID = config.get("goodreads.userId");
const URL = `https://www.goodreads.com/user/updates_rss/${USER_ID}`;

const feed = await parse(URL);
const hasUpdate = hasUpdateToday(feed);
if (hasUpdate) {
  console.log("Goodreads :: has update");
  if (!(await hasDatapointToday(GOAL))) {
    await createDatapoint(GOAL);
  }
} else {
  console.log("Goodreads :: does not have update");
}
process.exit();
