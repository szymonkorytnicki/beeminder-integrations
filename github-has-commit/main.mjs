/**
 * Check if user made at least one commit today
 */

import config from "config";
const API_KEY = config.get("github.apiKey");
const GOAL = config.get("github.beeminder.goal");
import { Octokit } from "@octokit/core";
import rssToJson from "rss-to-json";
const { parse } = rssToJson;
import { hasCommitToday } from "./utils.mjs";
import { hasDatapointToday, createDatapoint } from "../beeminder-api/main.mjs";
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
