import {useScrollDirection} from "@/hooks/useScrollDirection.ts";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {useMyProfile} from "@/hooks/useMyProfile.ts";
import PopoverMenu from "@/components/PopoverMenu.tsx";
import {IoMenu} from "react-icons/io5";
import {CiLogout, CiSearch, CiUser} from "react-icons/ci";
import {supabase} from "@/lib/supabase.ts";
import {queryClient} from "@/lib/queryClient.ts";

const Header = () => {
  const scrollDir = useScrollDirection();
  const navigate = useNavigate();
  const myProfile = useMyProfile();

  return (
    <header
      className={clsx(`max-w-7xl flex px-4 py-1.5 mx-auto 
      transition-transform duration-300
      z-50 items-start justify-between h-8 max-h-8 min-h-8`,
        scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}>
      <h1 className="dark:text-white text-base text-black">
        감정 일기
      </h1>

      <PopoverMenu
        popoverPanelLocation="left"
        title={
          <div className="rounded-full flex items-center justify-center">
            <IoMenu className="text-xl text-gray-600 dark:text-gray-300"/>
          </div>
        }
      >
        {({close}) => (
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            <div className='w-full'>
              <button
                className='px-4 py-2 min-w-14 w-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg flex items-center gap-2'
                onClick={() => {
                  navigate(`/user-page/${myProfile?.id}`)
                  close();
                }}
              >
                <CiUser className='text-lg'/>
                <span className='whitespace-nowrap'>프로필</span>
              </button>
            </div>

            <div className='w-full'>
              <button
                className='px-4 py-2 min-w-14 w-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2'
                onClick={() => {
                  navigate('search-user');
                  close();
                }}
              >
                <CiSearch className='text-lg'/>
                <span className='whitespace-nowrap'>친구찾기</span>
              </button>
            </div>

            <div className='w-full'>
              <button
                className='px-4 py-2 min-w-14 w-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg flex items-center gap-2'
                onClick={async () => {
                  await supabase.auth.signOut();
                  queryClient.setQueryData(['authUser'], null); // 즉시 UI에 반영
                  queryClient.invalidateQueries({queryKey: ['authUser']}).then();
                  navigate('/start', {replace: true});
                  close();
                }}
              >
                <CiLogout className='text-lg'/>
                <span className='whitespace-nowrap'>로그아웃</span>
              </button>
            </div>
          </div>
        )}
      </PopoverMenu>
    </header>
  );
};

export default Header;

