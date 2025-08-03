import React, {useState} from 'react';
import Loading from '@/components/loading/Loading';
import Button from '@/components/Button.tsx';
import {useForm} from "react-hook-form";
import type {ProfileFormValues} from "@/types/UpdateUserPage.ts";
import {useUpdateUserPage} from "@/hooks/useUpdateUserPage.ts";
import {useUserProfile} from "@/hooks/useUserProfile.ts";
import defaultAvatar from '@/assets/default-avatar.png';
import {uploadAvatar} from "@/utils/uploadAvatar.ts";


const UpdateUserPage = ({onClose, myUserId}: { onClose: () => void, myUserId?: string }) => {
  const {mutate} = useUpdateUserPage(myUserId!, onClose);
  const {data: profile, isLoading} = useUserProfile(myUserId!);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting},
  } = useForm<ProfileFormValues>();

  React.useEffect(() => {
    if (profile) reset(profile);
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      let publicUrl: string | undefined;

      if (selectedImage) {
        publicUrl = await uploadAvatar(selectedImage, myUserId!, profile?.profile_image);
      }

      mutate({
        ...data,
        ...(publicUrl && {profile_image: publicUrl}), // 이미지 URL도 함께 보냄
      });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  if (isLoading) return <Loading title="프로필 불러오는 중..."/>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-3 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">프로필 수정</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
        <div className="flex items-center gap-4">
          {/* 이미지 클릭 시 파일 선택 창 열림 */}
          <label className="relative cursor-pointer group" title="프로필 이미지 변경">
            <img
              className="size-28 rounded-full border border-gray-200 dark:border-gray-800 object-cover group-hover:opacity-80 transition"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : profile?.profile_image || defaultAvatar
              }
              alt="프로필 이미지"
            />
            {/* 숨겨진 파일 선택 input */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setSelectedImage(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            {/* Hover 시 안내 텍스트 */}
            <div
              className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black bg-opacity-50 text-white py-1 rounded-b opacity-0 group-hover:opacity-100 transition">
              클릭하여 변경
            </div>
          </label>

          {/* 텍스트 안내 영역 */}
          <div>
            <span className="block text-sm font-medium dark:text-white text-gray-800">
              프로필 이미지
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              JPG, PNG 파일을 업로드하세요.
            </p>
          </div>
        </div>

        {/* 닉네임 */}
        <div>
          <label className="block font-medium dark:text-gray-200 mb-1">닉네임</label>
          <input
            {...register('nickname')}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>

        {/* 이메일 (읽기 전용) */}
        <div>
          <label className="block font-medium dark:text-gray-200 mb-1">
            이메일
            <span className='text-xs dark:text-gray-500 ml-2 text-gray-600'>
              ( 변경 불가 )
            </span>
          </label>
          <input
            {...register('email')}
            readOnly
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
          />
          <label className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-xs mt-1">
            <input type="checkbox" {...register('is_email_public')} className="accent-blue-500"/>
            이메일 공개
          </label>
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block font-medium dark:text-gray-200 mb-1">전화번호</label>
          <input
            {...register('phone')}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
          <label className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-xs mt-1">
            <input type="checkbox" {...register('is_phone_public')} className="accent-blue-500"/>
            전화번호 공개
          </label>
        </div>

        {/* 생일 */}
        <div>
          <label className="block font-medium dark:text-gray-200 mb-1">생일</label>
          <input
            type="date"
            {...register('birthday')}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
          <label className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-xs mt-1">
            <input type="checkbox" {...register('is_birthday_public')} className="accent-blue-500"/>
            생일 공개
          </label>
        </div>

        {/* 성별 */}
        <div>
          <label className="block font-medium dark:text-gray-200 mb-1">성별</label>
          <select
            {...register('gender')}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          >
            <option value="">선택 안 함</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
            <option value="기타">기타</option>
          </select>
          <label className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-xs mt-1">
            <input type="checkbox" {...register('is_gender_public')} className="accent-blue-500"/>
            성별 공개
          </label>
        </div>

        {/* 자기소개 */}
        <div>
          <label className="block font-medium dark:text-gray-200 mb-1">자기소개</label>
          <textarea
            rows={5}
            {...register('introduction')}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-4 pb-4">
          <Button variant="outlined" size="md" intent="primary" onClick={onClose}>
            취소하기
          </Button>
          <Button variant="contained" size="md" intent="primary" type="submit" disabled={isSubmitting}>
            저장하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;