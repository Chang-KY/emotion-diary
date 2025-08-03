import {useEffect, useRef, useState} from "react";
import {useDiaryList} from "@/hooks/useDiaryList.ts";
import {useVirtualizer} from "@tanstack/react-virtual";
import NoticeTitle from "@/components/NoticeTitle.tsx";
import {useMyProfile} from "@/hooks/useMyProfile.ts";
import Loading from "@/components/loading/Loading.tsx";
import WriteButton from "@/components/layout/WriteButton.tsx";
import UpButton from "@/components/layout/UpButton.tsx";
import clsx from "clsx";
import DiaryCard from "@/components/DiaryCard.tsx";

const MyList = ({userId, isOther}: { userId?: string, isOther?: boolean }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const myProfile = useMyProfile();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useDiaryList(userId ? userId : myProfile?.id ?? '', isOther);
  const flatData = data?.pages.flat() ?? [];
  const [showUpButton, setShowUpButton] = useState(false);
  const rowVirtualizer = useVirtualizer({
    count: flatData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45, // 각 아이템 높이
    overscan: 5,
  });
  const items = rowVirtualizer.getVirtualItems();

  // 스크롤 끝에 가까우면 다음 페이지 요청
  const lastItem = items[items.length - 1];
  if (
    lastItem &&
    lastItem.index >= flatData.length - 1 &&
    hasNextPage &&
    !isFetchingNextPage
  ) {
    fetchNextPage().then();
  }

  useEffect(() => {
    const container = parentRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowUpButton(container.scrollTop > 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    parentRef.current?.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div className={clsx(`w-full relative`,
      userId ? 'h-[calc(100%-10rem)]' : 'h-full'
    )}>
      {isLoading && (
        <div className="size-full flex items-center justify-center">
          <Loading/>
        </div>
      )}
      {!isLoading && flatData.length === 0 && (
        <div className="size-full flex items-center justify-center">
          <NoticeTitle level="h2">오늘의 기분을 적어주세요!</NoticeTitle>
        </div>
      )}
      {items.length > 0 && !userId && (
        <div className='py-1 text-center w-full'>
          내 감정일기 리스트
        </div>
      )}
      {flatData.length > 0 && (
        <div
          ref={parentRef}
          className="w-full h-full rounded overflow-y-auto"
          style={{contain: 'strict'}}
        >
          <div
            style={{height: `${rowVirtualizer.getTotalSize()}px`}}
            className='max-w-screen-xl size-full mx-auto relative'
          >
            {items.map((virtualRow) => {
              const diary = flatData[virtualRow.index];

              return (
                <div
                  key={diary.id}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="absolute inset-x-0 top-0 px-3"
                  style={{transform: `translateY(${virtualRow.start}px)`}}
                >
                  <DiaryCard diary={diary}/>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <WriteButton/>
      {showUpButton && <UpButton onClick={handleScrollToTop}/>}
    </div>
  );
};

export default MyList;