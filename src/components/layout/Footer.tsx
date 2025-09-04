import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import {useScrollDirection} from '@/hooks/useScrollDirection';
import {appTabs} from "@/constants/appTabs.tsx";

const Footer = () => {
  const scrollDir = useScrollDirection();

  return (
    <footer
      className={clsx(
        `fixed bottom-0 dark:bg-black bg-white left-0 right-0 z-50
        transition-transform duration-300 w-full 
        lg:max-w-5xl m-auto h-9 max-h-9 min-h-9`,
        scrollDir === 'down' ? 'translate-y-full' : 'translate-y-0'
      )}
    >
      <nav className='h-full w-full flex justify-around'>
        <ul className="flex items-center h-full w-full">
          {appTabs.map(({path, icon, label}) => (
            <li key={path} className="flex-1 flex flex-col items-center justify-center text-sm">
              <NavLink
                to={path}
                className={({isActive}) =>
                  clsx(
                    'flex flex-col items-center gap-1 w-full h-full',
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                  )
                }
              >
                <div className="text-xl">{icon}</div>
                <span className='text-xs'>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
