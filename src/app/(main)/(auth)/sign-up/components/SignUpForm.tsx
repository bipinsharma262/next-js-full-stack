'use client';

import { FormField } from '@/app/components/ui/FormField';
import { FormEvent } from 'react';
import { usePasswordSignUp } from '@/lib/hooks/useSignup';
import { Button } from '@/app/components/ui/Button';

export default function SignUpForm() {
  const { formData, handleChange, handleSubmit, loading, errors } = usePasswordSignUp();

  const SignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={SignUpSubmit}>
        <FormField
          label="Name"
          type="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-gradient-to-br from-violet-500 to-blue-500 hover:bg-gradient hover:from-violet-600 hover:to-blue-600"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
