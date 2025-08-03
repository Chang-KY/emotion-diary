import React from 'react';
import {cva, type VariantProps} from "class-variance-authority";
import clsx from "clsx";
import SpinnerLoading from "@/components/loading/SpinnerLoading.tsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<VariantProps<typeof buttonVariants>, 'variant'> &
  Omit<VariantProps<typeof buttonVariants>, 'intent'> &
  {
    variant: NonNullable<VariantProps<typeof buttonVariants>['variant']>;
    intent: NonNullable<VariantProps<typeof buttonVariants>['intent']>;
    size: NonNullable<VariantProps<typeof buttonVariants>['size']>;
    isLoading?: boolean;
    disabled?: boolean;
  };

const buttonVariants = cva(
  'rounded-md font-base transition', {
    variants: {
      variant: {
        contained: '',
        outlined: 'bg-transparent border',
        text: 'bg-transparent',
        text_underline: `bg-transparent 
                         underline 
                         underline-offset-2 
                         border-b border-white
                         decoration-gray-500 
                         dark:decoration-gray-300`,
      },
      size: {
        sm: 'text-sm px-3 py-1',
        md: 'text-base px-4 py-1.5',
        lg: 'text-lg px-5 py-2',
      },
      intent: {
        success: '',
        error: '',
        warning: '',
        info: '',
        primary: '',
        secondary: '',
        danger: '',
      },
    },
  });

const getColorClasses = (variant: string | null, intent: string | null) => {
  if (variant === 'contained') {
    switch (intent) {
      case 'success':
        return 'bg-green-400 text-white hover:bg-green-300';
      case 'error':
        return 'bg-red-400 text-white hover:bg-red-300';
      case 'primary':
        return 'bg-blue-400 text-white hover:bg-blue-300';
      case 'warning':
        return 'bg-orange-400 text-white hover:bg-orange-300';
      case 'danger':
        return 'bg-rose-500 text-white hover:bg-rose-400';
      default:
        return '';
    }
  }

  if (variant === 'outlined') {
    switch (intent) {
      case 'success':
        return 'border border-green-400 text-green-600 hover:bg-green-50';
      case 'error':
        return 'border border-red-400 text-red-600 hover:bg-red-50';
      case 'primary':
        return 'border border-blue-400 text-blue-600 hover:bg-blue-50';
      case 'warning':
        return 'border border-yellow-400 text-yellow-600 hover:bg-yellow-50';
      case 'danger':
        return 'border border-rose-500 text-rose-600 hover:bg-rose-50';
      default:
        return '';
    }
  }

  if (variant === 'text' || variant === 'text_underline') {
    switch (intent) {
      case 'success':
        return 'text-green-600 hover:underline';
      case 'error':
        return 'text-red-600 hover:underline';
      case 'primary':
        return 'text-blue-600 hover:underline';
      case 'secondary':
        return 'text-gray-700 dark:text-gray-300 hover:underline';
      case 'danger':
        return 'text-rose-600 hover:underline';
      default:
        return '';
    }
  }
  return '';
}

const Button = ({
                  className,
                  type = 'button',
                  isLoading = false,
                  disabled = false,
                  variant,
                  intent,
                  size,
                  children,
                  ...props
                }: ButtonProps) => {
  const variantClass = getColorClasses(variant, intent);

  return (
    <button className={
      clsx(buttonVariants({size}),
        className,
        `relative flex items-center justify-center gap-2 text-center`,
        !disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
        variantClass)}
            type={type}
            {...props}
            disabled={disabled}
    >
      {isLoading ? <SpinnerLoading/> : null}
      {children}
    </button>
  );
};

export default Button;