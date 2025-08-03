import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/user-page/')) {
      document.title = '유저 페이지 - emotion-diary';
      return;
    } else if (path.startsWith('/search-user/')) {
      document.title = '유저 찾기 - emotion-diary';
      return;
    } else if (path.startsWith('/diary/')) {
      document.title = '다이어리 - emotion-diary';
      return;
    }

    switch (path) {
      case '/':
        document.title = '홈 - emotion-diary';
        break;
      case '/error':
        document.title = '에러 - emotion-diary';
        break;
      case '/start':
        document.title = '시작 - emotion-diary';
        break;
      case '/auth/callback':
        document.title = '인증 중 입니다. - emotion-diary';
        break;
      case '/feed':
        document.title = '피드 - emotion-diary';
        break;
      case '/history':
        document.title = '이력 - emotion-diary';
        break;
      case '/stats':
        document.title = '통계 - emotion-diary';
        break;
      case '/my-list':
        document.title = '내 리스트 - emotion-diary';
        break;
      default:
        document.title = 'emotion-diary';
        break;
    }
  }, [location.pathname]);
};

export default usePageTitle;
