import {useMutation, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useDeleteComment = (diaryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number) => {
      const {error} = await supabase
        .from('emotion_comment')
        .delete()
        .eq('id', commentId);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['emotion_comment', diaryId]});
    }
  });
};
