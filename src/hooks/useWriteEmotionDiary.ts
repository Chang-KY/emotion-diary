import {useMutation, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";
import type {WriteFormType} from "@/types/WriteFormType";
import {CustomError} from "@/utils/CustomError";
import {formatToYYYYMMDD} from "@/utils/formatToYYYYMMDD.ts";
import {setMergedQueryData} from "@/utils/SetQueryData";

type Mode = 'insert' | 'update';

export const useWriteEmotionDiary = (
  mode: Mode,
  userId?: string,
  options?: {
    onMutate?: () => void;
    onSuccess?: () => void;
    onError?: (message: string) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: WriteFormType) => {
      const {
        data: {user},
      } = await supabase.auth.getUser();

      if (!user?.id) {
        throw new CustomError('로그인이 필요합니다.', 401);
      }

      if (mode === 'insert') {
        const {data, error} = await supabase
          .from('emotion_diary')
          .insert([{
            share_scope: input.shareScope,
            date: formatToYYYYMMDD(input.date),
            content: input.content,
            image_url: input.image_url,
            emotion_type: input.emotionType,
            user_id: user.id,
          }]);

        if (error) {
          if (error.code === '23505' || error.details?.includes('duplicate')) {
            throw new CustomError('오늘의 감정일기는 이미 작성하셨습니다.', 409);
          }
          throw new CustomError(error.message, 500);
        }
        return data;
      }

      if (mode === 'update') {
        const {data, error} = await supabase
          .from('emotion_diary')
          .update({
            share_scope: input.shareScope,
            content: input.content,
            image_url: input.image_url,
            emotion_type: input.emotionType,
          })
          .eq('user_id', user.id)
          .eq('date', formatToYYYYMMDD(input.date))
          .eq('id', input.id);

        if (error) {
          throw new CustomError(error.message, 500);
        }
        return data;
      }
    },
    onMutate: options?.onMutate,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['my-diary-list']}).then();

      if (mode === 'insert') {
        const date = new Date(variables.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        queryClient.invalidateQueries({
          queryKey: ['monthEmotions', userId, Number(year), Number(month)],
        }).then();
      }

      // update일 때만 병합 (insert는 새로 생성이므로 불필요)
      if (mode === 'update' && variables.id) {
        setMergedQueryData(queryClient, ['emotion_diary_detail', Number(variables.id)], {
          content: variables.content,
          emotion_type: variables.emotionType,
          share_scope: variables.shareScope,
          image_url: variables.image_url
        });
      }

      options?.onSuccess?.();
    },
    onError: (error: unknown) => {
      if (options?.onError) {
        if (error instanceof CustomError) {
          options.onError(error.message);
        } else {
          options.onError('알 수 없는 에러가 발생했습니다.');
        }
      }
    },
  });
};