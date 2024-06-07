import dayjs from "./dayjs";


function getDiffInSeconds(ts: number | string | Date | dayjs.Dayjs): string {
  const now = new Date();
  const then = dayjs(ts).toDate();
  const diffInSeconds = Math.abs(now.getTime() - then.getTime()) / 1000;
  return `${Math.floor(diffInSeconds)} second`;
}

export function getRelativeTime(ts: number | string | Date | dayjs.Dayjs | null): string | null {
  try {
    if (ts) {
      return dayjs(ts).fromNow();
    }
    return null;
  } catch (e) {
    if (ts) {
      return getDiffInSeconds(ts);
    }
    return null;
  }
}