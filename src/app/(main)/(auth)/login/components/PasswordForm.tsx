'use client';

import { FormEvent } from 'react';

import { usePasswordLogin } from '@/lib/hooks/usePasswordLogin';
import { Button } from '@/app/components/ui/Button';
import { FormField } from '@/app/components/ui/FormField';
import { Key, Mail } from 'lucide-react';

export default function PasswordLoginForm() {
  const { formData, handleChange, handleSubmit, errors, loading } = usePasswordLogin();

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form className="space-y-4" onSubmit={loginSubmit}>
      <FormField
        id="email"
        label="Email"
        type="email"
        name="email"
        icon={<Mail className="h-5 w-5 text-gray-400" />}
        placeholder="abc@email.com"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        className='pl-10'
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        name="password"
        placeholder='******'
        icon={<Key className="h-5 w-5 text-gray-400"/>}
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={errors.password}
        className='pl-10'
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full text-white !bg-gradient-to-r from-blue-500 to-purple-600 hover:!bg-gradient hover:from-blue-600 hover:to-purple-600"
      >
        Login
      </Button>
    </form>
  );
}
