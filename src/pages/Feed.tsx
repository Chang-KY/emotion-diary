import {useEffect, useRef, useState} from "react";
import {useFeedDiaries} from "@/hooks/useFeedDiaries.ts";
import {useVirtualizer} from "@tanstack/react-virtual";
import Loading from "@/components/loading/Loading.tsx";
import NoticeTitle from "@/components/NoticeTitle.tsx";
import clsx from "clsx";
import DiaryCard from "@/components/DiaryCard.tsx";

const Feed = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFeedDiaries();
  const flatData = data?.pages.flatMap(page => page.diaries) ?? [];
  const [showUpButton, setShowUpButton] = useState(false);
  const rowVirtualizer = useVirtualizer({
    count: flatData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();

  // 무한 스크롤 트리거
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

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    parentRef.current?.scrollTo({top: 0, behavior: "smooth"});
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <NoticeTitle level="h2">피드를 불러오지 못했습니다.</NoticeTitle>
      </div>
    );
  }

  return (
    <div className={clsx(`w-full relative h-full`)}>
      {flatData.length === 0 && (
        <div className="w-full h-full flex items-center justify-center flex-col gap-1">
          <NoticeTitle level="h2">피드가 비어 있습니다.</NoticeTitle>
        </div>
      )}

      {flatData.length > 0 && (
        <div
          ref={parentRef}
          className="w-full h-full rounded overflow-y-auto"
          style={{contain: "strict"}}
        >
          <div
            style={{height: `${rowVirtualizer.getTotalSize()}px`}}
            className="max-w-screen-xl size-full mx-auto relative"
          >
            {items.map(virtualRow => {
              const diary = flatData[virtualRow.index];
              return (
                <div
                  key={diary.id}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="absolute inset-x-0 top-0 px-3"
                  style={{transform: `translateY(${virtualRow.start}px)`}}
                >
                  <DiaryCard diary={diary} key={diary.id}/>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showUpButton && (
        <button
          className="fixed bottom-20 right-4 bg-blue-500 text-white px-3 py-1 rounded shadow-md z-50"
          onClick={handleScrollToTop}
        >
          ↑ 위로
        </button>
      )}
    </div>
  );
};

export default Feed;