import "dayjs/locale/ru";

import dayjs from "dayjs";

export function formatMessageTime(isoTime: string): string {
  const now = dayjs();
  const msgTime = dayjs(isoTime);

  if (msgTime.isAfter(now)) {
    return msgTime.format("HH:mm");
  }

  const diffDays = now.diff(msgTime, "day");

  if (diffDays === 0) {
    return msgTime.format("HH:mm");
  }

  if (diffDays === 1) {
    return `Вчера в ${msgTime.format("HH:mm")}`;
  }

  const currentYear = now.year();
  const msgYear = msgTime.year();

  if (msgYear === currentYear) {
    return msgTime.format("D MMM [в] HH:mm");
  } else {
    return msgTime.format("DD.MM.YYYY [в] HH:mm");
  }
}
