import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const {data, error} = await supabase
        .from('profiles')
        .select('*') // 원하는 필드
        .eq('id', userId)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId,
  });
};
