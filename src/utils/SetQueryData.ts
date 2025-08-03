import type {QueryClient, QueryKey} from '@tanstack/react-query';

export const setMergedQueryData = <T extends object>(
  queryClient: QueryClient,
  key: QueryKey,
  updatedData: Partial<T>
) => {
  queryClient.setQueryData<T>(key, (prev) => {
    const merged = {
      ...(prev ?? {}),
      ...updatedData,
    };

    return merged as T;
  });
};
