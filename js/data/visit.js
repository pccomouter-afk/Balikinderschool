const WEEK = {
  1: ["09:00", "10:30", "13:00"],
  2: ["09:00", "10:30", "13:00"],
  3: ["09:00", "10:30", "13:00"],
  4: ["09:00", "10:30", "13:00"],
  5: ["09:00", "10:30"],
  6: ["09:00", "10:30"],
  0: [],
};
export const isoDate = (d) =>
  d.getFullYear() +
  "-" +
  String(d.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(d.getDate()).padStart(2, "0");
export async function getSlots(date) {
  const base = WEEK[date.getDay()] || [];
  const drop = (date.getDate() * 7 + date.getMonth()) % base.length;
  return base.length > 1
    ? base.filter((s, i) => i !== drop || base.length < 3)
    : base;
}
export const visitConfig = { horizonDays: 75, isDummy: true };
