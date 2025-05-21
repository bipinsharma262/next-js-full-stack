import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/app/components/ui/Card';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProductCard({ id, title, imageUrl, description }: ProductCardProps) {
  return (
    <Card className="group relative flex flex-col overflow-hidden border border-gray-200/50 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50">
      {/* Product Badge - Can be dynamic based on product status */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
          New Arrival
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">4.0 (12 reviews)</span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 flex-none text-lg font-semibold text-gray-900 hover:text-blue-600">
          <Link href={`/products/${id}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p className="line-clamp-3 flex-grow text-sm text-gray-600">{description}</p>

        {/* Price - Can be dynamic based on product data */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900">$299</span>
          <span className="text-sm text-gray-500 line-through">$399</span>
          <span className="text-sm font-medium text-green-600">25% off</span>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-100 p-6 pt-4">
        <Link href={`/products/${id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full gap-2 border-gray-200 bg-white transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            View Details
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
