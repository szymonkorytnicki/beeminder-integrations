import axios from "axios";
import config from "config";
const USER = config.get("beeminder.user");
const AUTH_TOKEN = config.get("beeminder.authToken");
import { isToday } from "./utils";
import {format} from 'date-fns'

type BeeminderDatapoint = {
  value: number;
  daystamp: string
}

export async function hasDatapointToday(goal: string) {
  try {
    const datapoints = await axios.get(
      `https://www.beeminder.com/api/v1/users/${USER}/goals/${goal}/datapoints.json?auth_token=${AUTH_TOKEN}`
    );
    const hasDatapoint = datapoints.data.some((datapoint: BeeminderDatapoint) =>
      isToday(datapoint.daystamp)
    );
    if (hasDatapoint) {
      console.log("Beeminder :: has datapoint today for goal", goal);
    } else {
      console.log("Beeminder :: does not have datapoint today for goal", goal);
    }
    return hasDatapoint;
  } catch (e) {
    console.log("Beeminder :: error fetching datapoints", e.message);
    return false;
  }
}
export async function createDatapoint(goal: string) {
  try {
    console.log("Beeminder :: creating datapoint for goal", goal);
    await axios.post(
      `https://www.beeminder.com/api/v1/users/${USER}/goals/${goal}/datapoints.json?auth_token=${AUTH_TOKEN}`,
      {
        value: 1,
        comment: format(new Date(), "yyyy-MM-dd HH:mm")
      }
    );
    return true;
  } catch (e) {
    console.log("Beeminder :: error creating datapoint", e.message);
    return false;
  }
}
