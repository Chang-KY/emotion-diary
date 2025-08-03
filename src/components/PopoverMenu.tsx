import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import type {ReactNode} from "react";
import clsx from "clsx";

type PopOverProps = {
  title: ReactNode;
  popoverPanelLocation?: 'right' | 'left' | 'center';
  children: ReactNode | ((props: { close: () => void }) => ReactNode);
};


const PopoverMenu = (props: PopOverProps) => {
  const {title, children, popoverPanelLocation = 'center'} = props;

  return (
    <Popover className="z-50 relative bg-white dark:bg-black">
      {({close}) => (
        <>
          <PopoverButton
            className="block text-sm/6 font-semibold text-white/50
         focus:outline-none cursor-pointer"
          >
            {title}
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className={clsx(
              `divide-y divide-white/5 rounded-xl bg-white dark:bg-black text-sm/6
           transition duration-200 px-2 py-1 translate-y-0.5
           ease-in-out border-2 dark:border-gray-800 border-gray-100
           data-closed:-translate-y-1 data-closed:opacity-0`,
              popoverPanelLocation === "right"
                ? "translate-x-5"
                : popoverPanelLocation === "left"
                  ? "-translate-x-5"
                  : ""
            )}
          >
            {/* children 함수로 감싸기 */}
            {typeof children === 'function'
              ? children({close})
              : children}
          </PopoverPanel>
        </>
      )}
    </Popover>

  );
};

export default PopoverMenu;