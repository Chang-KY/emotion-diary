import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';
import {useMyProfile} from './useMyProfile';
import {formatToYYYYMMDD} from "@/utils/formatToYYYYMMDD.ts";

export const useTodayDiary = (date: Date) => {
  const user = useMyProfile();

  const yyyymmdd = formatToYYYYMMDD(date);

  return useQuery({
    queryKey: ['today-diary', user?.id, yyyymmdd],
    queryFn: async () => {
      if (!user?.id) return null;

      const {data, error} = await supabase
        .from('emotion_diary')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', `${yyyymmdd}T00:00:00`)
        .lte('date', `${yyyymmdd}T23:59:59`)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!user?.id,
  });
};