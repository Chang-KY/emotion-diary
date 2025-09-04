import React, {type ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import {IoMdClose} from 'react-icons/io';
import useResponsive from "@/hooks/useResponsive.ts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'fullscreen' | 'bottom-sheet';
}

const Modal = ({isOpen, onClose, children, className, variant = 'fullscreen'}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const startYRef = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const {isMd} = useResponsive();

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startYRef.current !== null) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startYRef.current;
      if (diff > 0) setDragOffset(diff); // 아래로 드래그일 때만
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 100) {
      onClose(); // 일정 이상 드래그 시 닫기
    } else {
      setDragOffset(0); // 초기화
    }
    startYRef.current = null;
  };

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
        setDragOffset(0); // 닫힐 때 드래그 초기화
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (typeof window === 'undefined') return null;
  if (!isVisible) return null;

  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={clsx(
        'fixed inset-0 z-50 flex justify-center items-end transition-transform duration-300',
        isMounted ? 'translate-y-0' : 'translate-y-full',
      )}
      style={variant === 'bottom-sheet' && dragOffset
        ? {transform: `translateY(${Math.min(dragOffset, 300)}px)`}
        : undefined
      }

      onClick={onClose}
    >
      <div
        className={clsx(
          'bg-white dark:bg-black text-black dark:text-white shadow-lg px-2 py-2 transition-all duration-300 relative',
          variant === 'fullscreen'
            ? isMd ? `w-2/3 h-4/5 border border-gray-200 dark:border-gray-700 rounded-md m-auto` : `w-full h-full md:rounded-lg`
            : `w-full max-h-[70vh] rounded-t-2xl touch-pan-y border-t-2 border-gray-100 dark:border-gray-900`,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 닫기 버튼 */}
        {variant === 'fullscreen' && (
          <button onClick={onClose}>
            <IoMdClose className='text-xl absolute top-3 left-3'/>
          </button>
        )}
        {/* bottom-sheet용 핸들 */}
        {variant === 'bottom-sheet' && (
          <div className="w-full flex justify-center py-2"
               onTouchStart={variant === 'bottom-sheet' ? handleTouchStart : undefined}
               onTouchMove={variant === 'bottom-sheet' ? handleTouchMove : undefined}
               onTouchEnd={variant === 'bottom-sheet' ? handleTouchEnd : undefined}>
            <div className="w-12 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"/>
          </div>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
