const { default: axios } = require("axios");
const config = require("config");
const USER = config.get("beeminder.user");
const AUTH_TOKEN = config.get("beeminder.authToken");
const { isToday } = require("./utils");

module.exports = {
  hasDatapointToday: async function (goal) {
    try {
      const datapoints = await axios.get(
        `https://www.beeminder.com/api/v1/users/${USER}/goals/${goal}/datapoints.json?auth_token=${AUTH_TOKEN}`
      );
      const hasDatapoint = datapoints.data.some((datapoint) =>
        isToday(datapoint.daystamp)
      );
      if (hasDatapoint) {
        console.log("Beeminder :: has datapoint today for goal", goal);
      } else {
        console.log(
          "Beeminder :: does not have datapoint today for goal",
          goal
        );
      }
      return hasDatapoint;
    } catch (e) {
      console.log("Beeminder :: error fetching datapoints", e.message);
      return false;
    }
  },
  createDatapoint: async function (goal) {
    try {
      console.log("Beeminder :: creating datapoint for goal", goal);
      await axios.post(
        `https://www.beeminder.com/api/v1/users/${USER}/goals/${goal}/datapoints.json?auth_token=${AUTH_TOKEN}`,
        {
          value: 1,
        }
      );
      return true;
    } catch (e) {
      console.log("Beeminder :: error creating datapoint", e.message);
      return false;
    }
  },
};
