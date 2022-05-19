/**
 * Check if user had bumped "pages read" today
 */
 import config from "config";
 import puppeteer from "puppeteer";
 import { hasDatapointToday, createDatapoint } from "../beeminder-api/main.mjs";
 
 const GOAL = config.get("goodreadsPages.beeminder.goal");
 const USERID = config.get("goodreadsPages.userId");
 const EMAIL = config.get("goodreadsPages.email");
 const PASSWORD = config.get("goodreadsPages.password");
  
 const browser = await puppeteer.launch({
         headless: false,
        //  executablePath: '/usr/bin/chromium-browser',
        //  args: ['--no-sandbox', '--disable-setuid-sandbox']
 });
 const page = await browser.newPage();
 
 await page.goto('https://www.goodreads.com/user/sign_in');
 
 await page.click('.authPortalSignInButton');
 await page.waitForSelector('#ap_email');
 
 await page.$eval('#ap_email', (el, email) => el.value = email, EMAIL);
 await page.$eval('#ap_password', (el, password) => el.value = password, PASSWORD);
 await page.click('#signInSubmit');
 
 
 await page.waitForSelector('.siteHeaderBottomSpacer');
 await page.goto('https://www.goodreads.com/review/stats/'+USERID+'#pages');
 
//  const text = await page.evaluate(() => {
//    const anchor = document.querySelector('.deckDueNumber');
//    return parseInt(anchor.innerText, 10);
//  });
 
//  if (text === 0) {
//    console.log('Anki :: done for today')
//    if (!(await hasDatapointToday(GOAL))) {
//      await createDatapoint(GOAL);
//    }
//  } else {
//    console.log('Anki :: not done for today')
//  }
 
 await browser.close();
 
 process.exit();