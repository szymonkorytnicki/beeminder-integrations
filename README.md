# beeminder-integrations

Beeminder integrations for me.

## Usage

Set up config/default.json for each integration. Before running a script, make sure you ran (once) `npm install` and have Node >= installed. You can have multiple Node versions installed (use nvm or fnm to manage them). Most likely you want to have some automation to run these commands.

## goodreads-has-pages-update

Has a user updated their pages read today?

This is PoC of integration between beeminder and goodreads. This script can be deployed and trigger some other integration beeminder actually supports.
Since it's a program, versatility is unlimited. We can imagine this script making git commits as dense as your daily pages count (to get heatmap), twitting, triggering IFTTT and others.

When it's in beeminder you get your daily timing of reading - might be helpful to uncover reading patterns (e.g. I read when my kid is asleep; I read more often on weekends...).

```
npm run goodreads
```

## github-has-commit

Check if committed at least once today.

```
npm run github
```

## anki-cleared-queue

Check if Anki queue is empty (does not include new cards, only cards to do)

```
npm run anki
```

## goodreads-pages-count

Check if total pages read count has changed and update your goal. This integration works only if you finished the book, NOT when you updated a progress on a particular book. It looks at pages read at your /stats page on Goodreads. Hence it is the best to set odometer goal with total pages read.

```
npm run goodreadsPages
```

## memrise

Check memrise points. Only update graph if latest data is different than latest datapoint.
This can be easily adjusted to words learned.
