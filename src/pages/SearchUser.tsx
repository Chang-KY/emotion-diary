import {useState} from 'react';
import Button from '@/components/Button';
import {useSearchUser} from "@/hooks/useSearchUser.ts";
import Avatar from "@/components/Avatar.tsx";
import {useNavigate} from "react-router-dom";

type User = {
  id: string;
  nickname: string;
  profile_image?: string;
  introduction?: string;
};

const SearchUser = () => {
  const [searchId, setSearchId] = useState('');
  const [submittedId, setSubmittedId] = useState('');

  const {data: user, isLoading, isError, error, refetch} = useSearchUser(
    submittedId,
    !!submittedId // enabled 조건
  );

  const handleSearch = () => {
    if (!searchId.trim()) return;
    setSubmittedId(searchId.trim());
    refetch().then();
  };

  return (
    <div className="size-full flex flex-col items-center justify-start p-4">
      <div className="flex gap-2 mb-4 w-full max-w-7xl">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="유저 ID로 검색"
          className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
        <Button size="md" intent="primary" variant="contained" onClick={handleSearch}>
          검색
        </Button>
      </div>

      {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">검색 중...</p>}
      {isError && error?.message === 'NOT_FOUND' && (
        <p className="text-sm text-red-500">유저를 찾을 수 없습니다.</p>
      )}
      {user && <UserCard user={user}/>}
    </div>
  );
};

export default SearchUser;

const UserCard = ({user}: { user: User }) => {
  const navigate = useNavigate();
  return (
    <button className="p-4 border rounded-md w-full max-w-7xl shadow-sm dark:border-gray-700"
            onClick={() => navigate(`/user-page/${user.id}`)}>
      <div className="flex items-center gap-4">
        <Avatar src={user.profile_image} className="w-12 h-12 rounded-full" alt="profile"/>
        <div className="flex flex-col items-start">
          <span className="font-semibold text-gray-900 dark:text-white">{user.nickname}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.introduction || '소개글이 없습니다'}
          </span>
        </div>
      </div>
    </button>
  );
};