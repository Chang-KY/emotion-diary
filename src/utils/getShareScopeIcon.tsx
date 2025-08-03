import {
  FaGlobe,       // public
  FaUsers,       // follower
  FaLock,        // private
  FaUserCheck,   // selected
} from 'react-icons/fa';

export const getShareScopeIcon = (scope: string) => {
  switch (scope) {
    case 'public':
      return <><FaGlobe className="inline mr-1"/>전체공개</>;
    case 'follower':
      return <><FaUsers className="inline mr-1"/>팔로워 공개</>;
    case 'private':
      return <><FaLock className="inline mr-1"/>비공개</>;
    case 'selected':
      return <><FaUserCheck className="inline mr-1"/>선택공개</>;
    default:
      return null;
  }
};
