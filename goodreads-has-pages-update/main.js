/**
 * Check if user had bumped "pages read" today
 */
const config = require("config");
const { parse } = require("rss-to-json");
const { hasUpdateToday } = require("./utils");
const USER_ID = config.get("goodreads.userId");
const URL = `https://www.goodreads.com/user/updates_rss/${USER_ID}`;

(async () => {
  const feed = await parse(URL);
  const hasUpdate = hasUpdateToday(feed);
  console.log(hasUpdate);
})();
