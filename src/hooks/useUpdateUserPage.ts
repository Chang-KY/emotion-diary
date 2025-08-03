import {useMutation, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase.ts";
import type {ProfileFormValues} from "@/types/UpdateUserPage.ts";
import {setMergedQueryData} from "@/utils/SetQueryData.ts";

export const useUpdateUserPage = (myProfileUserId: string, onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const {data: updatedData, error} = await supabase
        .from('profiles')
        .update(data)
        .eq('id', myProfileUserId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return updatedData;
    },

    onSuccess: (updatedData) => {
      setMergedQueryData<ProfileFormValues>(
        queryClient,
        ['userProfile', myProfileUserId],
        updatedData
      );
      alert('프로필이 수정되었습니다.');
      onClose?.();
    },
  });
};
