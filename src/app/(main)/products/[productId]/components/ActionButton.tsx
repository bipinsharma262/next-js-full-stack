'use client';

import { ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';

export default function ActionButtons({ productId }: { productId: string }) {
  const { data: session } = useSession();
 
  return (
    <div className="space-y-3">
      {session ? (
        <Link href={`/products/${productId}/purchase`} className="block">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 gap-2">
            Buy Now
            <ArrowRight size={16} />
          </Button>
        </Link>
      ) : (
        <Link href={'/login'} className="block">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 gap-2">
            Log In
          </Button>
        </Link>
      )}
    </div>
  );
}
