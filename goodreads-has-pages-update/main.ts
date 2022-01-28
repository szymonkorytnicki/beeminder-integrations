/**
 * Check if user had bumped "pages read" today
 */
import config from "config";
import { parse } from "rss-to-json";
import { hasUpdateToday } from "./utils.js";
import { hasDatapointToday, createDatapoint } from "../beeminder-api/main.js"

const GOAL: string = config.get("goodreads.beeminder.goal");
const USER_ID: string = config.get("goodreads.userId");
const URL: string = `https://www.goodreads.com/user/updates_rss/${USER_ID}`;
 
const feed = await parse(URL, {});
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
