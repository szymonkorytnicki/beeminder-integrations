import { createDatapoint, getGoals } from "../beeminder-api/main.mjs";
import config from "config";

const GOAL = config.get("urgency.goal");

const goals = await getGoals();
const load = goals.data.reduce((acc, goal) => {
  if (!goal.won) {
    acc += Math.max(7 - goal.safebuf, 0);
  }
  return acc;
}, 0);

const goalsWithLoad = goals.data
  .map((goal) => {
    const load = Math.max(7 - goal.safebuf, 0);
    return {
      slug: goal.slug,
      load: load,
    };
  })
  .filter((goal) => goal.load > 0);

await createDatapoint(GOAL, {
  value: load,
  comment: JSON.stringify(goalsWithLoad),
});

process.exit();
