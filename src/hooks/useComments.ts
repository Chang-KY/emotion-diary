import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

// commenter_id는 Commenter 객체 배열로 반환됩니다.
type Commenter = {
  id: string;
  nickname: string;
  profile_image: string;
};

type Comment = {
  id: string;
  content: string;
  created_at: string;
  commenter_id: Commenter[];  // commenter_id는 Commenter 객체의 배열입니다.
};

type UseCommentsResponse = Comment[];

// 댓글을 불러오는 훅
export const useComments = (diaryId?: string) => {
  return useQuery<UseCommentsResponse, Error>({
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
