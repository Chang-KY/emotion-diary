import {startOfMonth, endOfMonth, eachDayOfInterval, format, isToday, getDay, subDays, addDays} from "date-fns";

export type ScheduleDateType = {
  date: string; // YYYY-MM-DD 형식
  isToday: boolean;
  isCurrentMonth: boolean;
  events: { dailyId: string, emotionType: string, date: Date, content: string, shareScope: string }[]; // 이벤트 데이터를 여기에 추가 가능
};

export const getMonthDays = (year: number, month: number): ScheduleDateType[] => {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));
  const firstDayOfWeek = getDay(firstDay);

  const prevMonthDays = firstDayOfWeek > 0
    ? eachDayOfInterval({start: subDays(firstDay, firstDayOfWeek), end: subDays(firstDay, 1)})
    : [];

  const currentMonthDays = eachDayOfInterval({start: firstDay, end: lastDay});
  const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);

  const nextMonthDays = remainingDays > 0
    ? eachDayOfInterval({start: addDays(lastDay, 1), end: addDays(lastDay, remainingDays)})
    : [];

  return [
    ...prevMonthDays.map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      isToday: isToday(date),
      isCurrentMonth: false,
      events: [],
    })),
    ...currentMonthDays.map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      isToday: isToday(date),
      isCurrentMonth: true,
      events: [],
    })),
    ...nextMonthDays.map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      isToday: isToday(date),
      isCurrentMonth: false,
      events: [],
    })),
  ];
};
