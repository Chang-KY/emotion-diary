import {useParams} from "react-router-dom";
import {useUserProfile} from "@/hooks/useUserProfile";
import Loading from "@/components/loading/Loading";
import Avatar from "@/components/Avatar.tsx";
import {useMyProfile} from "@/hooks/useMyProfile";
import Button from "@/components/Button.tsx";
import Modal from "@/components/Modal";
import {useState} from "react";
import UpdateUserPage from "@/pages/UpdateUserPage.tsx";
import clsx from "clsx";
import UserPageInfo from "@/components/UserPageInfo.tsx";
import MyList from "@/pages/MyList.tsx";
import Follow from "@/pages/Follow.tsx";
import {useFollowerList, useFollowingList, useIsFollowing, useToggleFollow} from "@/hooks/useFollow.ts";

const UserPage = () => {
  const {id} = useParams();
  const {data: user, isLoading, error} = useUserProfile(id!);
  const myProfile = useMyProfile();
  const isMyPage = myProfile?.id === user?.id;
  const [activeTab, setActiveTab] = useState<'info' | 'diary'>('info');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFollower, setIsOpenFollower] = useState<'follower' | 'following' | ''>('');
  const {data: isFollowing} = useIsFollowing(myProfile?.id, id);
  const toggleFollow = useToggleFollow(myProfile?.id, id);
  const {data: following = []} = useFollowingList(id);
  const {data: followers = []} = useFollowerList(id);

  if (isLoading) return <Loading title="유저 정보를 불러오는 중..."/>;
  if (error) return <div className="text-red-500">유저 정보를 가져오지 못했습니다.</div>;

  return (
    <div className="max-w-7xl h-full mx-auto px-4 py-6">
      {/* 프로필 영역 */}
      <div className="flex items-center gap-4">
        <Avatar src={user?.profile_image} alt="Profile" size="xl"/>
        <div>
          <h2 className="text-2xl font-bold">
            {user?.nickname}
            {isMyPage && <span className="text-xs ml-3 text-blue-500">내 프로필</span>}
          </h2>
          <p className="text-sm text-gray-500">유저 ID: {user?.id}</p>
        </div>
      </div>

      <div className='flex items-center gap-4 justify-between mt-4'>
        <div className='flex items-center gap-3'>
          <button className='flex items-center gap-1.5'>
            <span className=''>{following.length ?? 0}</span>
            <span className='dark:text-gray-500 text-gray-700' onClick={() => setIsOpenFollower('following')}>팔로잉</span>
          </button>

          <button className='flex items-center gap-1.5' onClick={() => setIsOpenFollower('follower')}>
            <span className=''>{followers.length ?? 0}</span>
            <span className='dark:text-gray-500 text-gray-700'>팔로워</span>
          </button>

        </div>
        {isMyPage ? <Button variant='contained'
                            size="md"
                            intent="warning"
                            onClick={() => setIsOpen(true)}>
            프로필 수정
          </Button> :
          <Button variant={isFollowing ? 'outlined' : 'contained'}
                  intent={isFollowing ? 'danger' : 'primary'}
                  size='md'
                  onClick={() => toggleFollow.mutate(isFollowing!)}
          >
            {isFollowing ? '언 팔로우' : '팔로우'}
          </Button>}
      </div>

      <div className='border-b border-gray-200 dark:border-gray-800 mt-4 flex items-center gap-5'>
        <Button
          variant='text'
          size='md'
          intent='secondary'
          onClick={() => setActiveTab('info')}
          className={clsx(
            'pb-2 border-b-2  rounded-none',
            activeTab === 'info'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400'
          )}
        >
          정보
        </Button>

        <Button
          variant='text'
          size='md'
          intent='secondary'
          onClick={() => setActiveTab('diary')}
          className={clsx(
            'pb-2 border-b-2 rounded-none',
            activeTab === 'diary'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400'
          )}
        >
          일기 리스트
        </Button>
      </div>

      {activeTab === 'info' && <UserPageInfo user={user}/>}
      {activeTab === 'diary' && <MyList userId={id!} isOther={true}/>}

      {/* 팔로워 페이지 */}
      <Modal isOpen={isOpenFollower === 'follower' || isOpenFollower === 'following'}
             onClose={() => setIsOpenFollower('')}>
        <Follow mode={isOpenFollower as 'follower' | 'following'} userId={id!} nickname={user?.nickname}
                onClose={() => setIsOpenFollower('')}/>
      </Modal>

      {/* 수정 페이지 */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UpdateUserPage onClose={() => setIsOpen(false)} myUserId={myProfile?.id}/>
      </Modal>
    </div>
  );
};

export default UserPage;
