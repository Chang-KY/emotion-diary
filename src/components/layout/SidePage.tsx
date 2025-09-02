import React from 'react'
import {useNavigate} from 'react-router-dom'
import {CiLogout, CiSearch, CiUser} from 'react-icons/ci'
import {NavLink} from 'react-router-dom';
import clsx from 'clsx'

// hooks & libs (실제 프로젝트에 맞게 임포트 교체)
import {useScrollDirection} from '@/hooks/useScrollDirection'
import {useMyProfile} from '@/hooks/useMyProfile'
import {supabase} from '@/lib/supabase'
import {appTabs} from "@/constants/appTabs.tsx";
import {queryClient} from "@/lib/queryClient.ts";

const TopButtons: React.FC = () => {
  const navigate = useNavigate()
  const myProfile = useMyProfile()

  const menuButtons = [
    {
      label: '프로필',
      icon: <CiUser className="text-lg"/>,
      onClick: () => navigate(`/user-page/${myProfile?.id}`),
    },
    {
      label: '친구찾기',
      icon: <CiSearch className="text-lg"/>,
      onClick: () => navigate('/search-user'),
    },
    {
      label: '로그아웃',
      icon: <CiLogout className="text-lg"/>,
      onClick: async () => {
        await supabase.auth.signOut();
        queryClient.setQueryData(['authUser'], null); // 즉시 UI에 반영
        queryClient.invalidateQueries({queryKey: ['authUser']}).then();
        navigate('/start', {replace: true});
      },
    },
  ]

  return (
    <div className="flex justify-end gap-2">
      {menuButtons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200
           dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200
           hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {btn.icon}
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  )
}

const SideButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {appTabs.map((tab) => (
        <NavLink
          key={tab.path}
          onClick={() => navigate(`/${tab.path}`)}
          to={tab.path}
          className={({isActive}) => clsx(`flex flex-col items-center justify-center
           gap-1 rounded-xl border border-gray-200 
           dark:border-gray-800 py-4 hover:shadow-md 
           hover:bg-gray-50 dark:hover:bg-gray-900 transition`,
            isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400')}
        >
          {tab.icon}
          <span className="text-xs font-medium">{tab.label}</span>
        </NavLink>
      ))}
    </div>
  )
}

const SidePage: React.FC = () => {
  const scrollDir = useScrollDirection()

  return (
    <aside className="w-3/5 h-full py-4">
      <div className="size-full border-r border-gray-700 flex flex-col">
        {/* Top Buttons */}
        <div
          className={clsx(
            `flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800
             transition-transform duration-300`,
            scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
          )}
        >
          <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">감정 일기</h1>
          <TopButtons/>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            오늘의 마음, 가볍게 기록하기
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
            기분 한 줄과 사진 한 장이면 충분해.
          </p>

          {/* 4개의 주요 버튼 */}
          <SideButtons/>
        </div>
      </div>
    </aside>
  )
}

export default SidePage