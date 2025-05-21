'use client';

import { Button } from '@/app/components/ui/Button';
import { FormField } from '@/app/components/ui/FormField';
import { OTPRequestSchema } from '@/lib/utils/schema';
import { Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { z } from 'zod';

type RequestOTPType = z.infer<typeof OTPRequestSchema>;

interface RequestOtpForm {
  onSubmit: (email: string) => void;
  loading: boolean;
}

export default function RequestOtpForm({ onSubmit, loading }: RequestOtpForm) {
  const [email, setEmail] = useState<RequestOTPType['email']>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
    setEmail('');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormField
        id="email"
        label="Email"
        type="email"
        name="email"
        icon={<Mail className="h-5 w-5 text-gray-400" />}
        placeholder="abc@email.com"
        className='pl-10'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        disabled={loading}
        type="submit"
        className="w-full text-white !bg-gradient-to-r from-blue-500 to-purple-600 hover:!bg-gradient hover:from-blue-600 hover:to-purple-600"
      >
        Send OTP
        <Mail className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
