import {useParams} from "react-router-dom";
import {useDiaryDetail} from "@/hooks/useDetailDiary.ts";
import {FaArrowLeft} from "react-icons/fa";
import Avatar from "@/components/Avatar.tsx";
import {getEmotionInfo} from "@/utils/getEmotionInfo.ts";
import NoticeTitle from "@/components/NoticeTitle.tsx";
import Button from "@/components/Button.tsx";
import Modal from "@/components/Modal.tsx";
import {useState} from "react";
import Comments from "@/pages/Comments.tsx";
import {useNavigate} from 'react-router-dom';
import DetailDiaryComment from "@/components/DetailDiaryComment.tsx";
import {useMyProfile} from "@/hooks/useMyProfile.ts";
import {useToggleLike} from "@/hooks/useToggleLike.ts";
import Write from "@/pages/Write.tsx";
import clsx from "clsx";
import {CATEGORY} from "@/constants/emotions.ts";
import {getShareScopeIcon} from "@/utils/getShareScopeIcon.tsx";

const DetailDiary = () => {
  const {id} = useParams();
  const {data: diaryContents, isLoading: diaryLoading, error} = useDiaryDetail(id);
  const [isOpen, setIsOpen] = useState(false);
  const myProfile = useMyProfile();
  const liked = diaryContents?.emotion_like?.some(like => like.user_id === myProfile?.id);
  const navigate = useNavigate();
  const toggleLikeMutation = useToggleLike();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  if (diaryLoading) return <div className="p-4 text-center">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">에러: {error.message}</div>;
  if (!diaryContents) return <div className="p-4 text-gray-500">데이터 없음</div>;

  const {date, content, user_id: user, emotion_type, image_url} = diaryContents;
  const emotion = getEmotionInfo(emotion_type);

  const handleToggle = () => {
    toggleLikeMutation.mutate({userId: myProfile?.id, diaryId: id, liked});
  };

  return (
    <div className="mx-auto lg:h-full h-[calc(100%+5rem)]">
      <div
        className='text-lg fixed w-full flex px-3 py-2 items-center gap-5
          bg-white dark:bg-black z-50
        dark:text-white text-black border-b border-gray-100 dark:border-gray-800'>
        <FaArrowLeft className="cursor-pointer" onClick={() => navigate(-1)}/>
        <span>
          <span
            className='text-blue-600 dark:text-blue-500'>{myProfile?.id === diaryContents?.user_id.id ? '나' : `${diaryContents?.user_id.nickname}`}</span>
          의 일기</span>
      </div>
      <div className="pt-14 h-full overflow-y-auto">
        <div className="px-6 pt-1 space-y-3">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-3"
                    onClick={() => navigate(`/user-page/${diaryContents?.user_id.id}`)}>
              <Avatar src={user?.profile_image} alt='profile'/>
              <div>
                <div className="font-semibold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                  {user?.nickname}
                  <span
                    className={clsx(
                      'text-sm px-3 py-0.5 rounded-full flex items-center justify-center',
                      {
                        // POSITIVE
                        'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200':
                          emotion?.category === CATEGORY.POSITIVE,

                        // NEUTRAL
                        'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200':
                          emotion?.category === CATEGORY.NEUTRAL,

                        // NEGATIVE
                        'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200':
                          emotion?.category === CATEGORY.NEGATIVE,
                      }
                    )}>
                    {emotion?.emoji} {emotion?.label}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-left">{date} 작성</div>
              </div>
            </button>
            {diaryContents.user_id.id === myProfile?.id &&
              <>
                <Button variant='outlined' intent='primary' size='md' onClick={() => setIsOpenUpdate(true)}>
                  수정하기
                </Button>
                <Modal isOpen={isOpenUpdate} onClose={() => setIsOpenUpdate(false)}>
                  <Write setOpen={() => setIsOpenUpdate(false)} date={date}/>
                </Modal>
              </>}
          </div>

          {/* 본문 내용 */}
          <div className="mt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{content}</p>

            {image_url && <img src={image_url} className='size-36'/>}
          </div>

          {/* 공개범위 + 좋아요/댓글 */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button className="text-red-500"
                        onClick={handleToggle}
                        disabled={toggleLikeMutation.isPending}
                >
                  ❤️
                </button>
                <span className="text-sm">{diaryContents.emotion_like?.length ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-500">💬</span>
                <span className="text-sm">{diaryContents.emotion_comment?.length ?? 0}</span>
              </div>
            </div>
            <div>
              범위: {getShareScopeIcon(diaryContents.share_scope)}
            </div>
          </div>
        </div>

        <div className='border-t border-gray-100 dark:border-gray-800 mt-2'/>
        {/* 댓글 */}
        <div className='px-6 py-3'>
          <div className='flex items-center justify-between mb-3'>
            <NoticeTitle level='h6' className="">댓글</NoticeTitle>
            <Button variant='text_underline' size='sm' intent='secondary'
                    onClick={() => setIsOpen(true)}>
              댓글 쓰기</Button>
          </div>

          {/* 댓글 모음 */}
          <DetailDiaryComment id={id}/>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant='bottom-sheet'>
        <Comments onClose={() => setIsOpen(false)} diaryId={id!}/>
      </Modal>
    </div>
  );
};

export default DetailDiary;
