import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${className}`}
      {...props}
    />
  );
};