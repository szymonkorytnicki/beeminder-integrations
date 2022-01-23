function isToday(timestamp: string) {
  const today = new Date();
  const someDate = new Date(timestamp);
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}

type FeedItem = {
  title: string;
  published: string;
}
type Feed = {
  items: FeedItem[];
}

export function hasUpdateToday(feed: Feed) {
  return feed.items.some((feedItem) => {
    return feedItem.title.includes("is on page") && isToday(feedItem.published);
  });
}
