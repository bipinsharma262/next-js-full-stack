'use client';

import { z } from 'zod';

import { LoginSchema } from '@/lib/utils/schema';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';

type LoginFormData = z.infer<typeof LoginSchema>;

interface LoginErrors {
  email?: string;
  password?: string;
}

export function usePasswordLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  const [loading, startTransiton] = useTransition();

  const validateField = (field: keyof LoginFormData, value: string) => {
    const validateData = LoginSchema.shape[field].safeParse(value);
    if (!validateData.success) {
      const ErrorMessage = JSON.parse(validateData.error.message)[0].message as string;
      setErrors((prev) => ({ ...prev, [field]: ErrorMessage }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    return undefined;
  };

  const handleChange = (field: keyof LoginFormData, value: string) => {
    validateField(field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const validatedData = LoginSchema.safeParse(formData);
    if (validatedData.success) {
      const { email, password } = validatedData.data;
      startTransiton(async () => {
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/',
        });
      });
    }
    setFormData({ email: '', password: '' });
  };

  return {
    loading,
    errors,
    formData,
    handleChange,
    handleSubmit,
  };
}
