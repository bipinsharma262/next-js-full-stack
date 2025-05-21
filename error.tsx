'use client';

import { Button } from '@/app/components/ui/Button';
import Container from '@/app/components/ui/Container';
import { AlertCircle, Home } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('Unexpected error:', error);
  }, [error]);

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      router.push('/');
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transform transition-all hover:scale-[1.01]">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-500/20 rounded-full blur"></div>
            <AlertCircle className="h-16 w-16 text-red-500 relative" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Something went wrong</h1>
        
        <div className="text-gray-600 dark:text-gray-300 mb-8 space-y-4">
          <p className="text-lg">We&apos;re sorry, but an unexpected error has occurred.</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-700 dark:text-red-300 text-left overflow-auto max-h-32 border border-red-100 dark:border-red-900/50">
              <p className="font-medium">Error: {error.message}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleReset} 
            variant="default"
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            {typeof reset === 'function' ? 'Try Again' : 'Return to Home'}
          </Button>
          
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    </Container>
  );
}
