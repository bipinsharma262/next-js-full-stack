import Container from '@/app/components/ui/Container';
import ProductForm from '../../components/ProductForm';
import { getProductById } from '@/lib/services/product/product';

export default async function AddEditProduct(
  props: Readonly<{
    params: Promise<{ id: string[] }>;
  }>
) {
  const {id} = await props.params;
  const product = id?.[0] ?await getProductById(id[0]):null;
  return (
    <main className="flex-grow pt-24 pb-16">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Create Product
          </h1>
          <ProductForm data={product} />
        </div>
      </Container>
    </main>
  );
}
