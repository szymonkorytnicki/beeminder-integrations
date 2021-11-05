const today = new Date();
const pad = (int) => (int + "").padStart(2, "0");
let todayInBeeminderFormat =
  today.getFullYear() + pad(today.getMonth() + 1) + pad(today.getDate());

export function isToday(str) {
  return str === todayInBeeminderFormat;
}
