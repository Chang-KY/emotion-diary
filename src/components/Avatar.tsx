import {CiUser} from 'react-icons/ci';
import {cva, type VariantProps} from 'class-variance-authority';
import clsx from 'clsx';

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  className?: string;
}

const avatarVariants = cva(
  'rounded-full flex items-center justify-center overflow-hidden border bg-gray-100 dark:bg-gray-800 text-gray-500',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 min-h-6 min-w-6 max-h-6 max-w-6 text-xs',
        sm: 'w-8 h-8 min-h-8 min-w-8 max-h-8 max-w-8 text-sm',
        base: 'w-10 h-10 min-h-10 min-w-10 max-h-10 max-w-10 text-base',
        lg: 'w-12 h-12 min-h-12 min-w-12 max-h-12 max-w-12 text-lg',
        xl: 'w-14 h-14 min-h-14 min-w-14 max-h-14 max-w-14 text-xl',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  }
);

const Avatar = ({src, alt = 'avatar', size, className}: AvatarProps) => {
  const imageSrc = src || '';

  return (
    <div className={clsx(avatarVariants({size}), className)}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <CiUser/>
      )}
    </div>
  );
};

export default Avatar;
