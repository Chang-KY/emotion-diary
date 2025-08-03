import {useMutation} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useInsertUserIfNotExist = () => {
  return useMutation({
    mutationFn: async () => {
      const {data: userData, error: userError} = await supabase.auth.getUser();

      if (userError || !userData.user) {
        throw new Error('로그인된 사용자를 가져오지 못했습니다');
      }

      const user = userData.user;
      const {id, user_metadata} = user;

      const nickname =
        user_metadata?.user_name || user_metadata?.name || '이름없음';
      const profileImage = user_metadata?.avatar_url || '';
      const email = user_metadata?.email || '';

      // profiles 테이블에서 존재 여부 확인
      const {data: existing, error: existingError} = await supabase
        .from('profiles')
        .select('id')
        .eq('id', id)
        .maybeSingle();

      if (existingError) throw existingError;

      if (!existing) {
        const {error: insertError} = await supabase.from('profiles').insert({
          id,
          nickname,
          email,
          profile_image: profileImage,
        });

        if (insertError) throw insertError;
      }

      return true;
    },
  });
};
