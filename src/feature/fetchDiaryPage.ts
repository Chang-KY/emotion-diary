import {supabase} from "@/lib/supabase.ts";

export const fetchDiaryPage = async (
  userId: string,
  page: number,
  isOther?: boolean
) => {
  const from = page * 10;
  const to = from + 10 - 1;

  // 현재 로그인한 유저
  const {
    data: {user: loginUser},
    error: sessionError
  } = await supabase.auth.getUser();

  if (sessionError) throw new Error(sessionError.message);
  if (!loginUser) throw new Error("로그인된 유저가 없습니다.");

  // 공유 범위 조건 생성
  let shareScopeFilter: string[] = [];

  if (isOther) {
    // 1. 팔로우 여부 확인
    const {data: follow, error: followError} = await supabase
      .from("follows")
      .select("follower_id")
      .eq("following_id", userId)  // userId는 상대방 (내가 팔로우하고 있는지 확인)
      .eq("follower_id", loginUser.id) // 내가 로그인한 사용자
      .maybeSingle();

    if (followError) throw new Error(followError.message);

    if (follow) {
      // 팔로우 중이면 public + follower
      shareScopeFilter = ["public", "follower"];
    } else {
      // 아니면 public만
      shareScopeFilter = ["public"];
    }
  }

  // 1. 일기 목록 가져오기
  let query = supabase
    .from("emotion_diary")
    .select("*")
    .eq("user_id", userId)
    .order("date", {ascending: false})
    .range(from, to);

  if (shareScopeFilter.length > 0) {
    query = query.in("share_scope", shareScopeFilter);
  }

  const {data: diaries, error} = await query;

  if (error) throw new Error(error.message);
  if (!diaries) return [];

  const diaryIds = diaries.map((d) => d.id);
  const userIds = diaries.map((d) => d.user_id);

  // 2. 유저 프로필 가져오기
  const {data: profiles, error: profileError} = await supabase
    .from("profiles")
    .select("id, nickname, profile_image")
    .in("id", userIds);

  if (profileError) throw new Error(profileError.message);

  const profileMap = Object.fromEntries(profiles.map((p) => [p.id, p]));

  // 3. 좋아요 수 가져오기
  const {data: likes, error: likeError} = await supabase
    .from("emotion_like")
    .select("diary_id")
    .in("diary_id", diaryIds);

  if (likeError) throw new Error(likeError.message);

  const likeMap: Record<number, number> = {};
  likes.forEach((like) => {
    likeMap[like.diary_id] = (likeMap[like.diary_id] ?? 0) + 1;
  });

  // 4. 댓글 수 가져오기
  const {data: comments, error: commentError} = await supabase
    .from("emotion_comment")
    .select("diary_id")
    .in("diary_id", diaryIds);

  if (commentError) throw new Error(commentError.message);

  const commentMap: Record<number, number> = {};
  comments.forEach((c) => {
    commentMap[c.diary_id] = (commentMap[c.diary_id] ?? 0) + 1;
  });

  // 5. 통합 반환
  return diaries.map((diary) => ({
    ...diary,
    user: profileMap[diary.user_id],
    likeCount: likeMap[diary.id] ?? 0,
    commentCount: commentMap[diary.id] ?? 0
  }));
};
