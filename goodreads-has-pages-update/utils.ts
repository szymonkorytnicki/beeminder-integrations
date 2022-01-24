function isToday(timestamp: string): boolean {
  const today = new Date();
  const someDate = new Date(timestamp);
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}

type GoodreadsFeedItem = {
  title: string;
  published: string;
}
type GoodreadsFeed = {
  items: GoodreadsFeedItem[];
}

export function hasUpdateToday(feed: GoodreadsFeed) {
  return feed.items.some((feedItem) => {
    return feedItem.title.includes("is on page") && isToday(feedItem.published);
  });
}
