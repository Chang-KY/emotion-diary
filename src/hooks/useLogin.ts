import {useMutation} from '@tanstack/react-query';
import {supabase} from '@/lib/supabase';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (provider: 'kakao' | 'google') => {
      await supabase.auth.signOut();
      const {error} = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`, // 로그인 후 돌아올 페이지
        }
      });

      if (error) {
        const providerNameMap: Record<'kakao' | 'google', string> = {
          google: '구글',
          kakao: '카카오',
        };
        const displayName = providerNameMap[provider];
        throw new Error(`${displayName} 로그인 실패: ${error.message}`);
      }
    },
    onSuccess: () => {
      console.log('팝업 열림 → 로그인 시 리디렉션될 예정');
    },
  });
};
