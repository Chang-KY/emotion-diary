import {supabase} from "@/lib/supabase.ts";

export const uploadAvatar = async (
  file: File,
  userId: string,
  previousUrl?: string
) => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar.${fileExt}`;
  const bucketName = "avatars";

  // 1. 이전 이미지 삭제
  if (previousUrl) {
    const regex = new RegExp(`https://[^/]+/storage/v1/object/public/${bucketName}}`);
    const relativePath = previousUrl.replace(regex, "");

    if (relativePath) {
      const {error: deleteError} = await supabase.storage
        .from(bucketName)
        .remove([relativePath]);

      if (deleteError) {
        console.warn("이전 이미지 삭제 실패:", deleteError.message);
      }
    }
  }

  // 2. 새 이미지 업로드
  const {error: uploadError} = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  // 3. 공개 URL 얻기
  const {
    data: {publicUrl},
  } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  const cacheBypassUrl = `${publicUrl}?t=${Date.now()}`;

  const {error: updateError} = await supabase
    .from("profiles")
    .update({profile_image: cacheBypassUrl})
    .eq("id", userId);

  if (updateError) {
    console.error("프로필 이미지 업데이트 실패:", updateError.message);
    throw new Error("프로필 업데이트에 실패했습니다.");
  } else {
    console.log("프로필 이미지 업데이트 성공");
  }

  return cacheBypassUrl;
};
