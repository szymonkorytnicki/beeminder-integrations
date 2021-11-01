/**
 * Check if user made at least one commit today
 */

const config = require("config");
const API_KEY = config.get("github.apiKey");
const { Octokit } = require("@octokit/core");
const { parse } = require("rss-to-json");
const { hasCommitToday } = require("./utils");
const octokit = new Octokit({ auth: API_KEY });

(async () => {
  const feeds = await octokit.request("GET /feeds");
  const feed = await parse(feeds.data.current_user_actor_url);
  console.log(hasCommitToday(feed));
})();
