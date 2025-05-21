'use client';

import { Menu, X } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/Button';
import Container from '@/app/components/ui/Container';
import { navItems } from '@/constants';

type Props = {
  session?: Session | null;
};

export default function Navbar({session }: Props) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <Container className="max-w-screen-2xl">
        <div className="flex items-center justify-between h-16">
          <Link href={'/'} className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient-blue-purple border-none">ProductHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={cn(
                  'relative text-gray-600 hover:text-gray-900 transition-colors py-1',
                  pathname === item.path ? 'text-gray-900 font-medium' : ''
                )}
              >
                {item.label}
                {pathname === item.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-md" />
                )}
              </Link>
            ))}

            {session?.user ? (
              <>
              <Link href={'/admin'}>
                <Button className="hover:opacity-90 bg-[linear-gradient(90deg,#0EA5E9_0%,#9b87f5_100%)] text-white focus:ring-[#9b87f5]/50">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" className="hover:opacity-90 text-black border-gray-200 border">
                  Logout
                </Button>
              </>
            ) : (
              <Link href={'/login'}>
                <Button className="hover:opacity-90 bg-[linear-gradient(90deg,#0EA5E9_0%,#9b87f5_100%)] text-white focus:ring-[#9b87f5]/50">
                  Login
                </Button>
              </Link>
            )}
          </div>

          <Button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {session?.user ? (
              <>
              <Link href={'/admin'}>
                <Button className="hover:opacity-90 bg-[linear-gradient(90deg,#0EA5E9_0%,#9b87f5_100%)] text-white focus:ring-[#9b87f5]/50">
                  Dashboard
                </Button>
              </Link>
              <Button className="hover:opacity-90 text-black focus:ring-[#9b87f5]/50">
                  Logout
                </Button>
              </>
            ) : (
              <Link href={'/login'}>
                <Button className="hover:opacity-90 bg-[linear-gradient(90deg,#0EA5E9_0%,#9b87f5_100%)] text-white focus:ring-[#9b87f5]/50">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </Container>
    </nav>
  );
}
