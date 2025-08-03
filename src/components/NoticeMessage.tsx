import {cva, type VariantProps} from 'class-variance-authority';
import type {ReactNode} from 'react';
import clsx from 'clsx';

const noticeMessageVariants = cva('text-sm', {
  variants: {
    variant: {
      info: 'text-blue-700 dark:text-blue-500',
      error: 'text-red-700 dark:text-red-500',
      success: 'text-green-700 dark:text-green-500',
      warning: 'text-yellow-700 dark:text-yellow-500',
      text: 'text-gray-800 dark:text-gray-400'
    },
    level: {
      p: '',
      span: '',
      div: '',
      small: '',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

export type NoticeMessageVariantProps = VariantProps<typeof noticeMessageVariants>;

type NoticeMessageProps = {
  variant?: NoticeMessageVariantProps['variant'];
  level?: NoticeMessageVariantProps['level'];
  children: ReactNode;
  className?: string;
};

const NoticeMessage = ({variant, children, className, level = 'p'}: NoticeMessageProps) => {
  const Tag: "p" | "span" | "div" | "small" | null | undefined = level;
  if (!Tag) return;
  return (
    <Tag className={clsx(noticeMessageVariants({variant}), className)}>
      {children}
    </Tag>
  );
};

export default NoticeMessage;