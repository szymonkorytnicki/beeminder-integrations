const today = new Date();
const pad = (int: number) => (int + "").padStart(2, "0");
let todayInBeeminderFormat =
  today.getFullYear() + pad(today.getMonth() + 1) + pad(today.getDate());

export function isToday(str: string) {
  return str === todayInBeeminderFormat;
}
