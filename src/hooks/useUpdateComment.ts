import {useMutation, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useUpdateComment = (diaryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({commentId, content}: { commentId: number, content: string }) => {
      const {error} = await supabase
        .from('emotion_comment')
        .update({content})
        .eq('id', commentId);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['emotion_comment', diaryId]});
    }
  });
};
