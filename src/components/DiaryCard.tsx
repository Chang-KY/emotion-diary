import Avatar from "@/components/Avatar.tsx";
import {getShareScopeIcon} from "@/utils/getShareScopeIcon.tsx";
import {useNavigate} from "react-router-dom";
import {getEmotionInfo} from "@/utils/getEmotionInfo.ts";
import {formatToKoreanDate} from "@/utils/formatToYYYYMMDD.ts";

const DiaryCard = (props: {
  diary: {
    id: string,
    profile_image: string,
    date: Date,
    emotion_type: string,
    content: string,
    image_url: string,
    share_scope: string,
    likeCount: number,
    user_id: { id: string, nickname: string, profile_image: string },
    commentCount: number,
    created_at: Date,
  }
}) => {
  const {diary} = props;
  const navigate = useNavigate();
  const emotion = getEmotionInfo(diary.emotion_type);

  return (
    <button
      onClick={() => navigate(`/diary/${diary.id}`)}
      className='w-full px-4 py-4 my-2 border rounded-md shadow-md
                 flex flex-col justify-start items-start
                 border-gray-200 dark:border-gray-800
                 text-black dark:text-white
                 bg-white dark:bg-black
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 active:bg-blue-100 dark:active:bg-blue-900
                 transition-colors duration-150 ease-in-out'>
      <div className="flex gap-5 mb-2 items-center justify-between w-full">
        <div className='flex items-center gap-5'>
          <Avatar src={diary.user_id.profile_image} size="base"/>
          <span className="font-bold">{diary.date.toString()}의 일기</span>
        </div>
        {diary.user_id.nickname && diary.user_id.id &&
          <div className='flex flex-col items-end'>
            {diary.user_id.nickname}
            <span className="text-xs text-gray-600">({diary.user_id.id})</span>
          </div>}
      </div>

      <div className='flex items-center justify-start text-xs'>
        <span className="mr-1">{emotion?.emoji}</span>
        <p className='text-gray-900 dark:text-gray-300'>{emotion?.label}</p>
      </div>
      <p className="mb-1 text-left">{diary.content}</p>
      {diary.image_url && <div
        className='w-full flex items-center justify-end'>
        <img src={diary.image_url}
             className='size-14 border border-gray-200 dark:border-gray-800 rounded p-2'/>
      </div>}
      <div className="flex items-center justify-between w-full text-xs mt-2">
        <div className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
          {getShareScopeIcon(diary.share_scope)}
          {!diary.user_id.nickname && !diary.user_id.id && <div className='text-blue-400 ml-3'>
            작성된 날짜: {formatToKoreanDate(diary.created_at)}
          </div>}
        </div>

        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          ❤️ <span>{diary.likeCount ?? 0}</span>
                        </span>
          <span className="flex items-center gap-1">
                          💬 <span>{diary.commentCount ?? 0}</span>
                        </span>
        </div>
      </div>
    </button>
  );
};

export default DiaryCard;