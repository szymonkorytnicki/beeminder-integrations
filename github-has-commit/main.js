/**
 * Check if user made at least one commit today
 */

const config = require("config");
const API_KEY = config.get("github.apiKey");
const GOAL = config.get("github.beeminder.goal");
const { Octokit } = require("@octokit/core");
const { parse } = require("rss-to-json");
const { hasCommitToday } = require("./utils");
const { hasDatapointToday, createDatapoint } = require("../beeminder-api/main");
const octokit = new Octokit({ auth: API_KEY });

(async () => {
  const feeds = await octokit.request("GET /feeds");
  const feed = await parse(feeds.data.current_user_actor_url);
  if (hasCommitToday(feed)) {
    console.log("Github :: has update");
    if (!(await hasDatapointToday(GOAL))) {
      await createDatapoint(GOAL);
    }
  } else {
    console.log("Github :: does not have update");
  }
  process.exit();
})();
