/**
 * Check if user had bumped "total pages read" count
 */
import config from "config";
import puppeteer from "puppeteer";
import { getGoal, createDatapoint } from "../beeminder-api/main.mjs";

const GOAL = config.get("goodreadsPages.beeminder.goal");
const USERID = config.get("goodreadsPages.userId");
const EMAIL = config.get("goodreadsPages.email");
const PASSWORD = config.get("goodreadsPages.password");

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "/usr/bin/chromium-browser",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();

await page.goto("https://www.goodreads.com/user/sign_in");

await page.click(".authPortalSignInButton");
await page.waitForSelector("#ap_email");

await page.$eval("#ap_email", (el, email) => (el.value = email), EMAIL);
await page.$eval("#ap_password", (el, password) => (el.value = password), PASSWORD);
await page.click("#signInSubmit");

await page.waitForSelector(".siteHeaderBottomSpacer");

await page.goto("https://www.goodreads.com/review/stats/" + USERID + "#pages");
await page.waitForSelector(".siteHeaderBottomSpacer");
await page.waitForTimeout(5000);

const totalPagesCount = await page.evaluate(() => {
  const counters = document.querySelectorAll(".count");
  let totalCount = 0;
  for (let counter of counters) {
    totalCount += parseInt(counter.innerText, 10);
  }

  return totalCount;
});

const goalData = await getGoal(GOAL);

if (totalPagesCount > goalData.data.curval) {
  console.log("Goodreads Pages :: updated today");
  await createDatapoint(GOAL, {
    value: totalPagesCount,
  });
} else {
  console.log("Goodreads Pages :: not done for today");
}

await browser.close();

process.exit();
