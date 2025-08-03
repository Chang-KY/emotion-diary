import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const {data: sessionData} = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) return null;

      const {data: userData, error} = await supabase.auth.getUser();
      if (error || !userData.user) return null;

      return userData.user;
    },
    staleTime: 5 * 60 * 10000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
