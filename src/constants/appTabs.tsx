import {FaListUl, FaCalendarAlt, FaChartPie, FaGlobe} from 'react-icons/fa';
import Stats from "@/pages/Stats.tsx";
import Feed from "@/pages/Feed.tsx";
import History from "@/pages/History.tsx";
import MyList from "@/pages/MyList.tsx";

export const appTabs = [
  {
    path: 'my-list',
    label: '내 리스트',
    icon: <FaListUl/>,
    element: <MyList/>,
  },
  {
    path: 'history',
    label: '이력',
    icon: <FaCalendarAlt/>,
    element: <History/>,
  },
  {
    path: 'stats',
    label: '통계',
    icon: <FaChartPie/>,
    element: <Stats/>,
  },
  {
    path: 'feed',
    label: '피드',
    icon: <FaGlobe/>,
    element: <Feed/>,
  },
];