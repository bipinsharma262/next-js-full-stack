import React, { InputHTMLAttributes } from 'react';
import { Input } from '@/app/components/ui/Input';
import { Label } from '@/app/components/ui/Label';
import { cn } from '@/lib/utils';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function FormField({ label, error, icon, className, ...inputProps }: FormFieldProps) {
  return (
    <div className="space-y-2 text-black font-medium">
      <Label htmlFor={inputProps.id}>{label}</Label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Input className={cn('mt-1', error && 'border-red-500', className)} {...inputProps} />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
