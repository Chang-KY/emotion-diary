import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";

type FollowUser = {
  id: string;
  nickname: string;
  profile_image?: string;
  introduction?: string;
};

export const useFollowingList = (userId?: string) => {
  return useQuery<FollowUser[]>({
    queryKey: ['followingList', userId],
    enabled: !!userId,
    queryFn: async () => {
      const {data, error} = await supabase
        .from('follows')
        .select('following_id, following:following_id (id, nickname, profile_image, introduction)')
        .eq('follower_id', userId);

      if (error) throw new Error(error.message);
      return (
        data?.flatMap(f => Array.isArray(f.following) ? f.following : [f.following]) ?? []
      ) as FollowUser[];
    }
  });
};

export const useFollowerList = (userId?: string) => {
  return useQuery<FollowUser[]>({
    queryKey: ['followerList', userId],
    enabled: !!userId,
    queryFn: async () => {
      const {data, error} = await supabase
        .from('follows')
        .select('follower_id, follower:follower_id (id, nickname, profile_image, introduction)')
        .eq('following_id', userId);

      if (error) throw new Error(error.message);

      return (
        data?.flatMap(f => Array.isArray(f.follower) ? f.follower : [f.follower]) ?? []
      ) as FollowUser[];
    }
  });
};

export const useIsFollowing = (myId?: string, otherId?: string) => {
  const shouldFetch = !!myId && !!otherId && myId !== otherId;
  return useQuery({
    queryKey: ['isFollowing', myId, otherId],
    enabled: shouldFetch,
    queryFn: async () => {
      const {data, error} = await supabase
        .from('follows')
        .select('follower_id')
        .eq('follower_id', myId)
        .eq('following_id', otherId)
        .maybeSingle();

      if (error) throw new Error(error.message);
      return !!data;
    }
  });
};

export const useToggleFollow = (myId?: string, otherId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isFollowing: boolean) => {
      if (isFollowing) {
        const {error} = await supabase
          .from('follows')
          .delete()
          .eq('follower_id', myId)
          .eq('following_id', otherId);

        if (error) throw new Error(error.message);
      } else {
        const {error} = await supabase
          .from('follows')
          .insert({
            follower_id: myId,
            following_id: otherId
          });

        if (error) throw new Error(error.message);
      }
    },
    onSuccess: () => {
      // 팔로우 상태 다시 가져오기
      queryClient.invalidateQueries({queryKey: ['isFollowing', myId, otherId]});
      queryClient.invalidateQueries({queryKey: ['followerList', otherId]});
      queryClient.invalidateQueries({queryKey: ['followingList', myId]});
    }
  });
};