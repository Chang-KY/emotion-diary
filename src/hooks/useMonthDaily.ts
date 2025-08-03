import {startOfMonth, endOfMonth, format} from 'date-fns';
import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase.ts";

type EmotionDiary = {
  dailyId: string;
  emotionType: string;
  date: Date;
  content: string;
  shareScope: string;
};

export const useMonthDaily = (year: number, month: number, userId?: string) => {
  return useQuery<EmotionDiary[]>({
    queryKey: ['monthEmotions', userId, Number(year), Number(month)],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];

      const from = format(startOfMonth(new Date(year, month)), 'yyyy-MM-dd');
      const to = format(endOfMonth(new Date(year, month)), 'yyyy-MM-dd');

      const {data, error} = await supabase
        .from('emotion_diary')
        .select(`id,
          emotion_type,
          date,
          content, 
          share_scope,
          user_id (
            id,
            profile_image,
            nickname
          )`)
        .eq('user_id', userId)
        .gte('date', from)
        .lte('date', to);

      if (error) throw new Error(error.message);

      return (
        data?.map((item) => ({
          dailyId: item.id,
          emotionType: item.emotion_type,
          date: new Date(item.date),
          content: item.content,
          shareScope: item.share_scope,
        })) ?? []
      );
    },
  });
};

