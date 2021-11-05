const today = new Date();
const pad = (int) => (int + "").padStart(2, "0");
let todayInBeeminderFormat = [
  today.getFullYear(),
  pad(today.getMonth() + 1),
  pad(today.getDate()),
].join("-");

export function hasCommitToday(feed) {
  return feed.items.some((feedItem) => {
    return (
      feedItem.id.includes("PushEvent") &&
      feedItem.content.includes(todayInBeeminderFormat)
    );
  });
}
