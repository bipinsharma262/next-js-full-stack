'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/app/components/ui/Button';

export const GoogleLogin = ({redirect} : {redirect: string}) => {
  const handleClick = () => {
    signIn('google', {
      callbackUrl: redirect,
    });
  };

  return (
    <div className="mt-2 w-full space-y-2">
      <Button
        size="lg"
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 shadow-sm text-base border border-gray-300 hover:bg-gray-50"
        variant="outline"
        onClick={() => handleClick()}
      >
        <FcGoogle className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>
    </div>
  );
};
