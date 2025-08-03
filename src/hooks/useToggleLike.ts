import {useMutation, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

interface ToggleLikeParams {
  userId?: string;
  diaryId?: string;
  liked?: boolean;
}

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({userId, diaryId, liked}: ToggleLikeParams) => {
      if (liked) {
        // 좋아요 취소
        const {error} = await supabase
          .from('emotion_like')
          .delete()
          .eq('user_id', userId)
          .eq('diary_id', diaryId);
        if (error) throw error;
        return {liked: false};
      } else {
        // 좋아요 추가
        const {error} = await supabase
          .from('emotion_like')
          .insert({user_id: userId, diary_id: diaryId});
        if (error) throw error;
        return {liked: true};
      }
    },
    onSuccess: (_, variables) => {
      // 좋아요 상태가 변했으므로 상세 정보 refetch
      queryClient.invalidateQueries({
        queryKey: ['emotion_diary_detail', Number(variables.diaryId)],
      });
    },
  });
};
