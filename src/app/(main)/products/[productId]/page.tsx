import Image from 'next/image';
import { Product } from '@prisma/client';

import { Card } from '@/app/components/ui/Card';
import Container from '@/app/components/ui/Container';
import ProductDetailsPanel from '@/app/(main)/products/[productId]/components/ProductDetailPanel';
import { getProductById } from '@/lib/services/product/product';
import { redirect } from 'next/navigation';



export default async function ProductIdPage({
  params,
}: {
  params: Promise<{
    productId: string;
  }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (product === null) {
    return redirect("/products");
  }

  return (
    <main className="flex-grow pt-16 sm:pt-24 pb-8 sm:pb-16">
      <Container size="xl" className="px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <ProductImage product={product} />
            <ProductDescription product={product} />
          </div>
          <div className="lg:col-span-1">
            <ProductDetailsPanel product={product} />
          </div>
        </div>
      </Container>
    </main>
  );
}

function ProductImage({ product }: { product: Product }) {
  return (
    <Card className="glass-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl">
      <div className="aspect-[16/10] sm:aspect-video w-full rounded-lg overflow-hidden">
        <Image
          src={product.image as string}
          alt={product.title}
          className="w-full h-full object-cover"
          width={1200}
          height={800}
          priority
        />
      </div>
    </Card>
  );
}

function ProductDescription({ product }: { product: Product }) {
  return (
    <Card className="glass-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl mt-4 sm:mt-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Product Description</h2>
      <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>
    </Card>
  );
}
