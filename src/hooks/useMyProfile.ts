import {useEffect, useState} from 'react';
import {supabase} from "@/lib/supabase.ts";

export const useMyProfile = () => {
  const [profile, setProfile] = useState<{ profile_image: string, id: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {data: userData, error: userError} = await supabase.auth.getUser();
      if (userError || !userData.user) return;

      const userId = userData.user.id;

      const {data, error} = await supabase
        .from('profiles')
        .select('profile_image, id')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    };

    fetchProfile().then();
  }, []);

  return profile;
};
