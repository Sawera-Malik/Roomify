import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#252525] text-white dark:bg-[#F7F5F0] dark:text-[#252525] hover:bg-[#B08D57] dark:hover:bg-[#B08D57] dark:hover:text-white',
    secondary: 'bg-[#E8E1D5] text-[#252525] dark:bg-[#2E2B27] dark:text-[#F7F5F0] hover:bg-[#D4C4A8] dark:hover:bg-[#3A3530]',
    outline: 'border border-[#E0D9CE] dark:border-[#3A3530] text-[#252525] dark:text-[#F7F5F0] hover:border-[#B08D57] hover:text-[#B08D57]',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-[#777777] hover:text-[#252525] dark:hover:text-[#F7F5F0] hover:bg-[#F7F5F0] dark:hover:bg-[#2E2B27]',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
