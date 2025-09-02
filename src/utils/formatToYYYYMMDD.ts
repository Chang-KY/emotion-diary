import {format} from 'date-fns';
import {ko} from "date-fns/locale";

export const formatToYYYYMMDD = (date: Date) => {
  return format(date, 'yyyy-MM-dd'); // 지역 타임존 기준 → 안정적
};

export const formatToKoreanDate = (date: Date) => {
  return format(date, "yyyy년 M월 d일 HH:mm:ss", {locale: ko});
}