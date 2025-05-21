'use client';

import { Button } from '@/app/components/ui/Button';
import { FormField } from '@/app/components/ui/FormField';
import { ArrowRight, Key } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface VerifyOTPFormProps {
  loading: boolean;
  email: string;
  onSubmit: (otp: string) => void;
  onBack: () => void;
}

export default function VerifyOtpForm({ email, onSubmit, onBack, loading }: VerifyOTPFormProps) {
  const [otp, setOtp] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(otp);
    setOtp('');
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="text-sm font-semibold text-gray-600 mb-2">
        We&apos;ve sent a one-time password to <span className="font-medium">{email}</span>
      </div>
      <FormField
        id="otp"
        name="otp"
        type="text"
        label="One-Time Password"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="pl-10"
        icon={<Key className="w-5 h-5 text-gray-500" />}
      />
      <div className="flex flex-col space-y-2">
        <Button
          disabled={loading}
          type="submit"
          className="w-full text-white bg-gradient-to-br from-violet-500 to-blue-500 hover:bg-gradient hover:from-violet-600 hover:to-blue-600"
        >
          Verify OTP
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          disabled={loading}
          type="button"
          onClick={onBack}
          className="w-full"
        >
          Back to email
        </Button>
      </div>
    </form>
  );
}
