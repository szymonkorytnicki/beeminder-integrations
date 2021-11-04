# beeminder-integrations

Beeminder integrations for me.

## Usage

Set up config/default.json for each integration

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
