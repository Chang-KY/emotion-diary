import {useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {queryClient} from '@/lib/queryClient';

export const useSupabaseAuthListener = () => {
  useEffect(() => {
    const {data: sub} = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(['authUser'], null);
        queryClient.invalidateQueries({queryKey: ['authUser']}).then();
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        queryClient.setQueryData(['authUser'], session?.user ?? null);
        queryClient.invalidateQueries({queryKey: ['authUser']}).then();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);
};