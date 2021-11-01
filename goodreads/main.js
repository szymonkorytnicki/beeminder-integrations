/**
 * Check if user had bumped "pages read" today
 */
const USER_ID = "126622339";
const URL = `https://www.goodreads.com/user/updates_rss/${USER_ID}`;
const { parse } = require("rss-to-json");
const { hasUpdateToday } = require("./utils");
const express = require("express");
const app = express();
const port = 5000;

app.get("/", async (req, res) => {
  const feed = await parse(URL);
  const hasUpdate = hasUpdateToday(feed);
  res.status(hasUpdate ? 200 : 404).send();
  // TODO this can run in CRON and ping IFTTT when goal is done
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
