import SignUpForm from '@/app/(main)/(auth)/sign-up/components/SignUpForm';
import AuthCard from '@/app/(main)/(auth)/components/AuthCard';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <AuthCard title="Get Started" description="Create your account" redirect='/'>
      <SignUpForm />
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
