import ProductCard from '@/app/(main)/products/components/product-card';
import { Card } from '@/app/components/ui/Card';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { Button } from '@/app/components/ui/Button';

interface ProductsDisplayProps {
  products: Product[] | null;
  isGridView: boolean;
  lastElementRef?: (node: HTMLElement | null) => void;
}

export default function ProductsDisplay({ products, isGridView, lastElementRef }: ProductsDisplayProps) {
  if (products!.length === 0) {
    return (
      <Card className="glass-panel p-8 text-center border border-gray-200/50">
        <p className="text-gray-500">No products found matching your criteria.</p>
      </Card>
    );
  }

  if (isGridView) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products!.map((product, index) => (
          <div
            key={product.id}
            ref={index === products!.length - 1 ? lastElementRef : undefined}
          >
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description as string}
              imageUrl={product.image as string}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      {products!.map((product, index) => (
        <div
          key={product.id}
          ref={index === products!.length - 1 ? lastElementRef : undefined}
        >
          <ListViewProduct product={product} />
        </div>
      ))}
    </div>
  );
}

function ListViewProduct({ product }: { product: Product }) {
  return (
    <Card className="glass-panel p-4 flex flex-col md:flex-row gap-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="w-full md:w-48 h-48 md:h-32 flex-shrink-0">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={product.image as string}
            alt={product.title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <Button
          variant="outline"
          onClick={() => (window.location.href = `/products/${product.id}`)}
          className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
