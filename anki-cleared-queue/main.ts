/**
 * Check if user had bumped "pages read" today
 */
import config from "config";
import puppeteer from "puppeteer";
import { hasDatapointToday, createDatapoint } from "../beeminder-api/main.js";

const GOAL: string = config.get("anki.beeminder.goal");
const USERNAME: string = config.get("anki.username");
const PASSWORD: string = config.get("anki.password");
 
const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();
await page.goto('https://ankiweb.net/account/login');


await page.$eval('input[name=username]', (el, username) => el.setAttribute('value', username as string), USERNAME);
await page.$eval('input[name=password]', (el, password) => el.setAttribute('value', password as string), PASSWORD);
await page.click('input[type="submit"]');

await page.waitForSelector('#deckActions');

const text = await page.evaluate(() => {
  const anchor = document.querySelector('.deckDueNumber font');
  return parseInt(anchor?.innerHTML || "", 10);
});

if (text === 0) {
  console.log('Anki :: done for today')
  if (!(await hasDatapointToday(GOAL))) {
    await createDatapoint(GOAL);
  }
} else {
  console.log('Anki :: not done for today')
}

await browser.close();

process.exit();