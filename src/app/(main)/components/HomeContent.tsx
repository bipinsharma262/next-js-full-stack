'use client';

import Container from '@/app/components/ui/Container';
import { Button } from '@/app/components/ui/Button';
import HeroImage from '@/app/(main)/components/HeroImage';
import Link from 'next/link';

export default function HeroContent() {
  return (
    <Container className="relative" size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="text-center md:text-left">
            <h1 className="animate-fade-in text-5xl font-bold">
              <span className="block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Discover Premium Products
              </span>
            </h1>

            <p
              className="mt-6 text-xl text-gray-600 animate-fade-in leading-relaxed"
              style={{ animationDelay: '0.2s' }}
            >
              Explore our curated collection of high-quality products designed to enhance your
              lifestyle. From cutting-edge electronics to essential accessories, find exactly what
              you need.
            </p>

            {/* Stats Section */}
            <div
              className="mt-8 grid grid-cols-3 gap-6 max-w-2xl animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  500+
                </p>
                <p className="text-sm text-gray-600 mt-1">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  50k+
                </p>
                <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  99%
                </p>
                <p className="text-sm text-gray-600 mt-1">Satisfaction Rate</p>
              </div>
            </div>

            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Link href={'/products'}>
                <Button
                  size="lg"
                  className="hover:opacity-90 bg-[linear-gradient(90deg,#0EA5E9_0%,#9b87f5_100%)] text-white focus:ring-[#9b87f5]/50 px-8"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <HeroImage />
        </div>
      </div>
    </Container>
  );
}
