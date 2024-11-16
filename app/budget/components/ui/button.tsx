import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'solid';
  size?: 'icon' | 'default';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'default',
  className,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2';
  const variants = {
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
    solid: 'bg-blue-600 text-white hover:bg-blue-500',
  };
  const sizes = {
    default: 'px-4 py-2 text-sm',
    icon: 'p-2',
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};