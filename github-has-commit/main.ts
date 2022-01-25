/**
 * Check if user made at least one commit today
 */

import config from "config";
const API_KEY: string = config.get("github.apiKey");
const GOAL: string = config.get("github.beeminder.goal");
import { Octokit } from "@octokit/core";
import { parse } from "rss-to-json";
import { hasCommitToday } from "./utils";
import { hasDatapointToday, createDatapoint } from "../beeminder-api/main";
import axios from "axios";
const octokit = new Octokit({ auth: API_KEY });

const feeds = await octokit.request("GET /feeds");
try {
  const feed = await parse(feeds.data.current_user_actor_url as string, {});
  if (hasCommitToday(feed)) {
    console.log("Github :: has update");
    if (!(await hasDatapointToday(GOAL))) {
      await createDatapoint(GOAL);
    }
  } else {
    console.log("Github :: does not have update");
  }
} catch (e: unknown) {
  if (axios.isAxiosError(e)) {
    console.log("Github :: error", e.message);
  }
}
process.exit();
