import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useSearchUser = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['searchUser', userId],
    enabled: Boolean(userId?.trim()) && enabled,
    queryFn: async () => {
      const {data, error} = await supabase
        .from('profiles')
        .select('id, nickname, profile_image, introduction')
        .eq('id', userId.trim())
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!data) throw new Error('NOT_FOUND');
      return data;
    },
  });
};
