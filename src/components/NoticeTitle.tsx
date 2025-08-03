import {cva, type VariantProps} from 'class-variance-authority';
import type {ReactNode} from 'react';
import clsx from 'clsx';

const noticeMessageTitleVariants = cva('text-gray-800 dark:text-white', {
  variants: {
    level: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-medium',
      h5: 'text-lg font-medium',
      h6: 'text-base font-normal',
    },
  },
  defaultVariants: {
    level: 'h2',
  },
});

type NoticeMessageVariants = VariantProps<typeof noticeMessageTitleVariants>;

type NoticeMessageProps = {
  level?: NoticeMessageVariants['level'];
  children: ReactNode;
  className?: string;
};

const NoticeTitle = ({level = 'h2', children, className}: NoticeMessageProps) => {
  const Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | null | undefined = level;
  if (!Tag) return;
  return (
    <Tag className={clsx(noticeMessageTitleVariants({level}), className)}>
      {children}
    </Tag>
  );
};

export default NoticeTitle;
