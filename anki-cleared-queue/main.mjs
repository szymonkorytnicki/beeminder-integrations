/**
 * Check if user had bumped "pages read" today
 */
 import config from "config";
 import puppeteer from "puppeteer";
 import { hasDatapointToday, createDatapoint } from "../beeminder-api/main.mjs";
 
 const GOAL = config.get("anki.beeminder.goal");
 const USERNAME = config.get("anki.username");
 const PASSWORD = config.get("anki.password");
 
 (async () => {
   const browser = await puppeteer.launch({
           headless: true,
           executablePath: '/usr/bin/chromium-browser',
           args: ['--no-sandbox', '--disable-setuid-sandbox']
   });
   const page = await browser.newPage();
   await page.goto('https://ankiweb.net/account/login');
 
 
   await page.$eval('input[name=username]', (el, username) => el.value = username, USERNAME);
   await page.$eval('input[name=password]', (el, password) => el.value = password, PASSWORD);
   await page.click('input[type="submit"]');
 
   await page.waitForSelector('#deckActions');
 
   const text = await page.evaluate(() => {
     const anchor = document.querySelector('.deckDueNumber');
     return parseInt(anchor.innerText, 10);
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
 })();