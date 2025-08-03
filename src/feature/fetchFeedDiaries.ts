import {supabase} from '@/lib/supabase';

const PAGE_SIZE = 10;

export const fetchFeedDiaries = async ({pageParam = null}) => {
  const {
    data: {user: loginUser},
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !loginUser) throw new Error('로그인 상태가 아닙니다.');
  const myId = loginUser.id;

  const {data: follows, error: followError} = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', myId);

  if (followError) throw new Error(followError.message);
  const followingIds = follows.map(f => f.following_id);

  const {data: visibleIdsData, error: visibleError} = await supabase
    .from('diary_visibility')
    .select('diary_id')
    .eq('user_id', myId);

  if (visibleError) throw new Error(visibleError.message);
  const visibleIds = visibleIdsData.map(v => v.diary_id);

  let query = supabase
    .from('emotion_diary')
    .select(`
      *,
      user_id (
        id,
        nickname,
        profile_image
      )
    `)
    .or(
      [
        'share_scope.eq.public',
        followingIds.length > 0 ? `and(share_scope.eq.follower,user_id.in.(${followingIds.join(',')}))` : null,
        visibleIds.length > 0 ? `and(share_scope.eq.selected,id.in.(${visibleIds.join(',')}))` : null,
      ]
        .filter(Boolean)
        .join(',')
    )
    .order('date', {ascending: false})
    .limit(PAGE_SIZE);

  // 커서가 있을 경우(이전 페이지 마지막 date)
  if (pageParam) {
    query = query.lt('date', pageParam); // pageParam보다 과거만 가져옴
  }

  const {data, error} = await query;

  if (error) throw new Error(error.message);

  // 다음 페이지 커서 = 마지막 요소의 date
  const nextCursor = data?.length === PAGE_SIZE ? data[data.length - 1].date : undefined;

  return {
    diaries: data ?? [],
    nextCursor,
  };
};
