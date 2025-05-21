'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = ({ children, className, size = 'lg', ...props }: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('w-full mx-auto px-4 sm:px-6 md:px-8', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
