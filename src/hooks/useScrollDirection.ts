import {useEffect, useState} from 'react';

export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY) < 5) return; // 민감도 조절
      setScrollDir(currentY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', updateScrollDir);
    return () => window.removeEventListener('scroll', updateScrollDir);
  }, []);

  return scrollDir;
};
