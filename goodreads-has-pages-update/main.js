/**
 * Check if user had bumped "pages read" today
 */
const config = require("config");
const { parse } = require("rss-to-json");
const { hasUpdateToday } = require("./utils");
const { hasDatapointToday, createDatapoint } = require("../beeminder-api/main");

const GOAL = config.get("goodreads.beeminder.goal");
const USER_ID = config.get("goodreads.userId");
const URL = `https://www.goodreads.com/user/updates_rss/${USER_ID}`;

(async () => {
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
})();
