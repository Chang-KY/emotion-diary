import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useComments = (diaryId?: string) => {
  return useQuery({
    queryKey: ['emotion_comment', diaryId],
    queryFn: async () => {
      const {data, error} = await supabase
        .from('emotion_comment')
        .select(`
          id,
          content,
          created_at,
          commenter_id (
            id,
            nickname,
            profile_image
          )
        `)
        .eq('diary_id', diaryId)
        .order('created_at', {ascending: true});

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!diaryId,
  });
};