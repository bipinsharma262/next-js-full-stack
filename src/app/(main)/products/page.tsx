import ProductsContent from '@/app/(main)/products/components/ProductContent';
import { allProducts } from '@/app/actions/products';
import Container from '@/app/components/ui/Container';
import ProductsTable from '@/app/(main)/products/components/ProductsTable';
import { Card } from '@/app/components/ui/Card';
import { Product } from '@prisma/client';

export default async function ProductsPage() {
  const products = await allProducts();
  return (
    <>
      <main className="flex-grow pt-20 sm:pt-24 pb-8 sm:pb-16">
        <Container size="xl" className="space-y-4 sm:space-y-8 px-4 sm:px-6">
          <Card className="glass-panel p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Products</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your product content from this dashboard
            </p>
            <ProductsTable data={products as Product[]} />
          </Card>
        </Container>
      </main>
    </>
  );
}
