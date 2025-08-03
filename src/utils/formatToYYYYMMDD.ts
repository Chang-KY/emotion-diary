import {format} from 'date-fns';

export const formatToYYYYMMDD = (date: Date) => {
  return format(date, 'yyyy-MM-dd'); // 지역 타임존 기준 → 안정적
};
