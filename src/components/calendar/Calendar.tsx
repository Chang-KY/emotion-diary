import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import DayOfWeek from "@/components/calendar/DayOfWeek.tsx";
import {useEffect, useMemo, useState} from 'react';
import {format} from "date-fns";
import {getMonthDays} from "@/utils/getMonthDays.ts";
import {useMonthDaily} from "@/hooks/useMonthDaily.ts";
import {useMyProfile} from "@/hooks/useMyProfile.ts";
import clsx from "clsx";
import {emotionEmojiLabelMap, emotionEmojiMap} from "@/utils/emotionMap.ts";
import {useNavigate} from "react-router-dom";
import Button from "@/components/Button.tsx";
import Modal from "@/components/Modal.tsx";
import Write from "@/pages/Write.tsx";
import {useSetAtom} from "jotai/index";
import {fullScreenLoadingAtom} from "@/store/fullScreenLoadingAtom.ts";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const myProfile = useMyProfile();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed
  const title = format(currentDate, 'yyyy년 M월');
  const userId = myProfile?.id;
  const [selectedDay, setSelectedDay] = useState(new Date());
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {data: emotionData = [], isLoading} = useMonthDaily(currentYear, currentMonth, userId);
  const setFullScreenLoading = useSetAtom(fullScreenLoadingAtom);

  useEffect(() => {
    setFullScreenLoading(isLoading);
  }, [isLoading, setFullScreenLoading]);

  const days = useMemo(() => {
    const baseDays = getMonthDays(currentYear, currentMonth);

    const dayMap = new Map(baseDays.map(day => [day.date, {...day}]));

    for (const item of emotionData) {
      const date = format(new Date(item.date), 'yyyy-MM-dd');
      if (dayMap.has(date)) {
        dayMap.get(date)!.events.push(item); // 타입에 맞게 이벤트 넣기
      }
    }
    return Array.from(dayMap.values());
  }, [currentYear, currentMonth, emotionData]);

  const selectedDateDiaries = useMemo(() => {
    if (!selectedDay) return [];

    const formatted = format(selectedDay, 'yyyy-MM-dd');
    return emotionData.filter((item) =>
      format(new Date(item.date), 'yyyy-MM-dd') === formatted
    );
  }, [emotionData, selectedDay]);

  const goToPrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="lg:flex size-full lg:flex-col px-3 pb-2 overflow-y-auto">
      <header
        className="flex items-center justify-between px-6 py-4 lg:flex-none">
        <h1 className="text-2xl font-bold dark:text-gray-400 text-gray-800">
          <time dateTime={format(currentDate, 'yyyy-MM')}>
            {title}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white dark:bg-gray-800
          shadow-xs md:items-stretch">
            <button onClick={goToPrevMonth} type="button"
                    className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500">
              <FaChevronLeft className="size-5"/>
            </button>
            <button onClick={() => setCurrentDate(new Date())} type="button"
                    className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 md:block">
              Today
            </button>
            <button onClick={goToNextMonth} type="button"
                    className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500">
              <FaChevronRight className="size-5"/>
            </button>
          </div>
        </div>
      </header>

      <div className="shadow-sm lg:flex lg:flex-auto lg:flex-col">
        <DayOfWeek/>

        <div className="flex text-xs/6 text-gray-800 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <div
                key={day.date}
                data-is-today={day.isToday ? '' : undefined}
                data-is-current-month={day.isCurrentMonth ? '' : undefined}
                className="relative bg-black px-3 py-2 flex flex-col items-center data-is-current-month:bg-black data-is-current-month:text-white"
              >
                <time
                  dateTime={day.date}
                  className="in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center
                   in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-600
                   in-data-is-today:font-semibold in-data-is-today:text-white"
                >
                  {day.date
                    ? day.date.split('-').pop()?.replace(/^0/, '')
                    : null}
                </time>
                {day.events.length > 0 ? (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.dailyId}>
                        <div className="group flex">
                          <p
                            className="flex items-center text-blue-700 dark:text-blue-500 truncate font-medium text-white group-hover:text-indigo-600">
                            {event.emotionType}
                          </p>
                          <time
                            dateTime={event.date.toString()}
                            className="ml-1.5 hidden flex-none group-hover:text-indigo-600 xl:block"
                          >
                            {emotionEmojiMap[event.emotionType]}
                          </time>
                        </div>
                      </li>
                    ))}
                    {day.events.length > 2 ? <li className="text-gray-500">+ {day.events.length - 2} more</li> : null}
                  </ol>
                ) : null}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 lg:hidden">
            {days.map((day) => {
              // 컴포넌트 내부에 변수 정의
              const isCurrentMonth = day.isCurrentMonth;
              const isToday = day.isToday;
              const isSelected =
                selectedDay && format(selectedDay, 'yyyy-MM-dd') === day.date;

              const dateTextClass = clsx(
                isSelected && isToday && 'text-white',
                isSelected && isCurrentMonth && !isToday && 'text-white',
                !isSelected &&
                isCurrentMonth &&
                (isToday
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-gray-900 dark:text-white'),
                !isCurrentMonth && 'text-gray-500 dark:text-gray-500'
              );
              return (
                <button
                  key={day.date}
                  type="button"
                  onClick={() => setSelectedDay(new Date(day.date))}
                  data-is-today={day.isToday ? '' : undefined}
                  data-is-current-month={day.isCurrentMonth ? '' : undefined}
                  data-is-selected={isSelected ? '' : undefined}
                  className="flex flex-col h-14 px-3 py-2
                 {/*not-data-is-current-month:bg-gray-50*/}
                 {/*dark:not-data-is-current-month:bg-slate-700*/}
                 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500
                 hover:bg-gray-400 focus:z-10
                 {/*data-is-current-month:bg-gray-100*/}
                 {/*dark:data-is-current-month:bg-gray-500*/}
                 bg-white dark:bg-black
                 not-data-is-selected:data-is-current-month:not-data-is-today:text-gray-900
                 data-is-current-month:hover:bg-gray-700 data-is-selected:font-semibold
                 data-is-selected:text-white data-is-today:font-semibold
                 not-data-is-selected:data-is-today:text-indigo-600"
                >
                  <time
                    dateTime={day.date}
                    className={clsx(
                      'mx-auto',
                      dateTextClass,
                      'in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full',
                      'in-data-is-selected:not-in-data-is-today:bg-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-600'
                    )}
                  >
                    {(day.date as string).split('-').pop()?.replace(/^0/, '')}
                  </time>
                  <span className="sr-only">{day.events.length} events</span>
                  {day.events.length > 0 ? (
                    <span className="flex flex-wrap-reverse items-center justify-center">
                    {day.events.map((event) => (
                      <div key={event.dailyId}
                           className="text-2xl size-7 flex items-center justify-center">
                        {emotionEmojiMap[event.emotionType]}
                      </div>
                    ))}
                  </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="mt-1 space-y-3">
        {selectedDateDiaries.length > 0 ? (
          selectedDateDiaries.map((diary) => {
            const emotion = emotionEmojiMap[diary.emotionType];
            const emojiLabel = emotionEmojiLabelMap[diary.emotionType];
            return (
              <button
                key={diary.dailyId}
                onClick={() => navigate(`/diary/${diary.dailyId}`)}
                className='w-full px-5 py-4 border rounded-xl shadow-sm
                     flex flex-col gap-3 text-left
                     border-gray-200 dark:border-gray-800
                     text-black dark:text-white
                     bg-white dark:bg-gray-950
                     hover:bg-gray-100 dark:hover:bg-gray-800
                     active:bg-blue-100 dark:active:bg-blue-900
                     transition-all duration-150 ease-in-out'
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(diary.date), 'yyyy년 MM월 dd일')}
                    </p>
                    <p className="text-base font-semibold">내 감정 일기</p>
                  </div>
                </div>

                <div className='flex items-center gap-2 text-sm'>
                  <span className="text-xl">{emotion}</span>
                  <span className="text-gray-700 dark:text-gray-300">{emojiLabel}</span>
                </div>

                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 line-clamp-3">
                  {diary.content}
                </p>
              </button>
            );
          })
        ) : (
          <div className='flex flex-col items-center gap-3 justify-center'>
            <p className="text-center text-sm text-gray-400 dark:text-gray-600">
              선택된 날짜에 작성된 일기가 없습니다.
            </p>
            <Button intent='primary' variant='contained' size='md'
                    aria-label="기록하기"
                    onClick={() => setOpen(true)}
            >
              일기 작성
            </Button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Write setOpen={() => setOpen(false)} date={selectedDay}/>
            </Modal>
          </div>
        )}
      </div>

    </div>
  );
};

export default Calendar;