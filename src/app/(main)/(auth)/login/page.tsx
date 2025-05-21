import OTPForm from '@/app/(main)/(auth)/login/components/OTPForm';
import PasswordForm from '@/app/(main)/(auth)/login/components/PasswordForm';
import AuthCard from '@/app/(main)/(auth)/components/AuthCard';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/Tabs';

export const metadata: Metadata = {
  title: 'Login | ProductHub',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <AuthCard title="Welcome Back" description="Login to your account" redirect="/">
      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-gray-100">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="otp">OTP</TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
        <TabsContent value="otp">
          <OTPForm />
        </TabsContent>
      </Tabs>
      <p className="text-center text-sm text-gray-600 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
}
