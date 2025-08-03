import {FaGlobe, FaLock, FaUsers, FaUserCircle} from 'react-icons/fa';

export const ShareScopes = [
  {
    value: 'public',
    label: '전체 공개',
    icon: <FaGlobe/>,
    description: '누구나 이 글을 볼 수 있어요',
  },
  {
    value: 'follower',
    label: '팔로워만 보기',
    icon: <FaUsers/>,
    description: '팔로워에게만 공개됩니다',
  },
  {
    value: 'private',
    label: '나만 보기',
    icon: <FaLock/>,
    description: '본인 외에는 볼 수 없어요',
  },
  {
    value: 'selected',
    label: '선택 공개',
    icon: <FaUserCircle/>,
    description: '특정 사용자에게만 공개됩니다',
  },
] as const;

export type ShareScopeType = typeof ShareScopes[number]['value'];
