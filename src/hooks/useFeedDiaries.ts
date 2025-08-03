import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchFeedDiaries} from '@/feature/fetchFeedDiaries';

export const useFeedDiaries = () => {
  return useInfiniteQuery({
    queryKey: ['feedDiaries'],
    queryFn: ({pageParam = null}) => fetchFeedDiaries({pageParam}),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null, // 이거 0으로 놓았을 떄랑 비교
    staleTime: 1000 * 60 * 1,
  });
};
