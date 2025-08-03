import {useMutation, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useCreateComment = (diaryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const user = supabase.auth.getUser(); // 사용자 정보 필요시

      const {data, error} = await supabase.from('emotion_comment').insert({
        diary_id: diaryId,
        content,
        commenter_id: (await user).data.user?.id,
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['emotion_comment', diaryId]});
    }
  });
};
