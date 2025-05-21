'use client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { requestOTP, verifyOTP } from '@/app/actions/auth';

interface OTPFormState {
  email: string;
  step: 'request' | 'verify';
  error?: string;
}

export function useOTPLogin() {
  const [formState, setFormState] = useState<OTPFormState>({
    email: '',
    step: 'request',
  });
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const handleRequest = (email: string) => {
    startTransition(async () => {
      const response = await requestOTP({ email });

      if (response.success) {
        setFormState({ email, step: 'verify' });
      } else {
        setFormState((prev) => ({ ...prev, error: response.error }));
      }
    });
  };

  const handleVerify = async (code: string) => {
    startTransition(async () => {
      const response = await verifyOTP({ email: formState.email, otp: code });

      if (response.success) {
        router.push('/');
      } else {
        setFormState((prev) => ({ ...prev, error: response.error }));
      }
    });
  };

  const handleBack = () => setFormState((prev) => ({ ...prev, step: 'request', error: undefined }));

  return {
    formState,
    loading,
    handleRequest,
    handleVerify,
    handleBack,
  };
}
