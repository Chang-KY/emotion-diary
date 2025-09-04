import {createPortal} from "react-dom";
import clsx from "clsx";
import {IoMdClose} from "react-icons/io";
import {type ReactNode, useEffect, useState} from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const AlertModal = ({isOpen, onClose, children, className}: AlertModalProps) => {
  const modalRoot = document.getElementById('modal');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsMounted(true);
      }, 10);
    } else {
      setIsMounted(false);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isVisible) return null;
  if (!modalRoot) return null;
  return createPortal(
    <div
      className={clsx(
        'fixed inset-0 z-50 flex justify-center items-center transition-transform duration-300',
        isMounted ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div
        className={clsx(
          `bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-800
           shadow-lg p-8 transition-all duration-300 relative rounded-lg`,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className='cursor-pointer'>
          <IoMdClose className='text-xl absolute top-3 left-3'/>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default AlertModal;