import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchDiaryPage} from "@/feature/fetchDiaryPage.ts";

export const useDiaryList = (userId: string, isOther?: boolean) => {
  return useInfiniteQuery({
    queryKey: ['my-diary-list', userId],
    queryFn: ({pageParam = 0}) => fetchDiaryPage(userId, pageParam, isOther),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length;
    },
    enabled: !!userId,
  });
};