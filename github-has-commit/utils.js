function isToday(timestamp) {
  const today = new Date();
  const someDate = new Date(timestamp);
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}
module.exports = {
  hasCommitToday: function (feed) {
    return feed.items.some((feedItem) => {
      return feedItem.id.includes("PushEvent") && isToday(feedItem.published);
    });
  },
};
