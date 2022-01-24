const today = new Date();
const pad = (int: number): string => (int + "").padStart(2, "0");
let todayInBeeminderFormat = [
  today.getFullYear(),
  pad(today.getMonth() + 1),
  pad(today.getDate()),
].join("-");

type GithubFeed = {
  items: GithubFeedItem[];
}

type GithubFeedItem = {
  id: string;
  content: string
}

export function hasCommitToday(feed: GithubFeed) {
  return feed.items.some((feedItem) => {
    return (
      feedItem.id.includes("PushEvent") &&
      feedItem.content.includes(todayInBeeminderFormat)
    );
  });
}
