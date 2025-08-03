import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useDiaryDetail = (id?: string) => {
  return useQuery({
    queryKey: ['emotion_diary_detail', Number(id)],
    queryFn: async () => {
      const {data, error} = await supabase
        .from('emotion_diary')
        .select(`
          id,
          user_id,
          date,
          content,
          share_scope,
          emotion_type,
          image_url,
          user_id (
            id,
            nickname,
            profile_image,
            phone,
            birthday,
            gender
          ),
          emotion_like (
            user_id
          ),
          emotion_comment (
            id
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw new Error(error.message);
      return {...data,};
    },
    enabled: !!id,
  });
};
