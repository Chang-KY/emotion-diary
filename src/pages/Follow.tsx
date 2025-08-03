import {useFollowerList, useFollowingList} from "@/hooks/useFollow.ts";
import Button from "@/components/Button.tsx";
import clsx from "clsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Avatar from "@/components/Avatar.tsx";

const Follow = ({mode, userId, nickname, onClose}: {
  mode: 'following' | 'follower',
  userId: string,
  nickname: string,
  onClose: () => void
}) => {
  const [activeTab, setActiveTab] = useState(mode);
  const {data: following = []} = useFollowingList(userId);
  const {data: followers = []} = useFollowerList(userId);

  return (
    <div className='size-full'>
      <div
        className='max-w-7xl mx-auto border-b border-gray-200 dark:border-gray-800 mt-4 flex items-center justify-between gap-5'>
        <p className=''><span className='font-bold'>{nickname}</span> 님의</p>
        <div className='flex items-center'>
          <Button
            variant='text'
            size='md'
            intent='secondary'
            onClick={() => setActiveTab('following')}
            className={clsx(
              'pb-2 border-b-2  rounded-none',
              activeTab === 'following'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            )}
          >
            팔로잉
          </Button>

          <Button
            variant='text'
            size='md'
            intent='secondary'
            onClick={() => setActiveTab('follower')}
            className={clsx(
              'pb-2 border-b-2 rounded-none',
              activeTab === 'follower'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            )}
          >
            팔로워
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto size-full py-3 mx-auto max-w-7xl">
        {(activeTab === 'following' ? following : followers).length === 0 ? (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-8">
            {activeTab === 'following'
              ? '팔로잉한 사용자가 없습니다.'
              : '아직 팔로워가 없습니다.'}
          </div>
        ) : (
          (activeTab === 'following' ? following : followers).map((user) => (
            <FollowItem key={user.id} user={user} onClose={onClose}/>
          ))
        )}
      </div>

    </div>
  );
};

export default Follow;

const FollowItem = ({user, onClose}: {
  user: {
    id: string;
    nickname: string;
    profile_image?: string;
    introduction?: string;
  },
  onClose: () => void,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-200 dark:border-gray-700"
      onClick={() => {
        navigate(`/user-page/${user.id}`)
        onClose();
      }}
    >
      <Avatar src={user.profile_image} alt="profile" className="w-10 h-10 rounded-full"/>
      <div className="flex flex-col">
        <span className="font-medium text-gray-900 dark:text-white">{user.nickname}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
          {user.introduction || '소개글이 없습니다'}
        </span>
      </div>
    </div>
  );
};