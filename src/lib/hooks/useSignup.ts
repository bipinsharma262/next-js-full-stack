'use client';

import { z } from 'zod';
import { useState, useTransition } from 'react';

import { SignUpSchema } from '@/lib/utils/schema';
import { signUp } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

type SignUpFormData = z.infer<typeof SignUpSchema>;

interface SignUpErrors {
  name?: string
  email?: string
  password?: string
}

export function usePasswordSignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignUpErrors>({});

  const [loading, startTransiton] = useTransition();
  const router = useRouter();

  const validateField = (field: keyof SignUpFormData, value: string) => {
    const validateData = SignUpSchema.shape[field].safeParse(value);
    if (!validateData.success) {
      const ErrorMessage = JSON.parse(validateData.error.message)[0].message as string
      setErrors((prev) => ({ ...prev, [field]: ErrorMessage }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    return undefined;
  };

  const handleChange = (field: keyof SignUpFormData, value: string) => {
    validateField(field,value)
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const validatedData = SignUpSchema.safeParse(formData);
    if (validatedData.success) {
      startTransiton(() => {
        signUp(validatedData.data).then((data) => {
        if (data.success) {
          console.log(data.success)
          router.push("/login")
        } else {
          console.log(data.error)
        }
        });
      })
    }
    setFormData({ name: '', email: '', password: '' });
  };

  return {
    loading,
    errors,
    formData,
    handleChange,
    handleSubmit,
  };
}
