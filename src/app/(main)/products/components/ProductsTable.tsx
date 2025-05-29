'use client';

import { Product } from '@prisma/client';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import PaginationButtons from '@/app/(main)/products/components/PaginationButtons';
import { Button } from '@/app/components/ui/Button';
import DeleteProductModal from './DeleteProductModal';
import Link from 'next/link';
import { allProducts } from '@/app/actions/products';

interface ProductsTableProps {
  data: Product[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  //const [data, setData] = useState<Product[]>([]); for csr
  const [selected, setSelected] = useState<{ id: string; title: string }>({
    id: '',
    title: '',
  });
  const openModal = (id: string, title: string) => {
    setSelected({ id, title });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentProducts: Product[] = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / 5);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /*useEffect(() => {
    const fetchProduct = async () => {
      const products = await allProducts();
      setData(products);
    };
    fetchProduct();
  }, []); for csr*/

  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-600">No products found.</div>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 hidden sm:table-header-group">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Title</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Description</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Created</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 sm:table-row flex flex-col p-4 sm:p-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none shadow-sm sm:shadow-none mb-4 sm:mb-0"
                    >
                      <td className="py-2 sm:py-3 px-0 sm:px-4 sm:w-auto">
                        <div className="flex items-center gap-3">
                          <div className="h-16 w-16 sm:h-10 sm:w-10 rounded-lg sm:rounded overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              width={160}
                              height={160}
                              src={product.image as string}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-lg sm:text-base truncate max-w-[200px] sm:max-w-xs">
                            {product.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 px-0 sm:px-4 text-gray-600 sm:w-96">
                        <div className="sm:hidden font-medium text-gray-900 mb-1 text-sm">
                          Description:
                        </div>
                        <div className="line-clamp-2 text-sm sm:text-base">
                          {product.description}
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 px-0 sm:px-4 text-gray-600">
                        <div className="sm:hidden font-medium text-gray-900 mb-1 text-sm">
                          Created:
                        </div>
                        <div className="text-sm sm:text-base">
                          {product.createdAt
                            ? new Date(product.createdAt).toISOString().split('T')[0]
                            : ''}
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 px-0 sm:px-4 sm:text-right border-b-0">
                        <div className="flex sm:justify-end gap-2 mt-2 sm:mt-0">
                          <Link
                            href={`/products/add-edit/${product.id}`}
                            className="mt-[10px] h-9 rounded-md px-3 hover:bg-accent hover:text-accent-foreground text-gray-600 hover:!text-blue-600 flex-1 sm:flex-none"
                          >
                            <Edit size={16} className="mr-2 sm:mr-0" />
                            <span className="sm:hidden text-sm">Edit</span>
                          </Link>
                          <Button
                            variant="ghost"
                            onClick={() => openModal(product.id, product.title)}
                            className="h-9 rounded-md px-3 hover:bg-accent hover:text-accent-foreground text-gray-600 hover:!text-blue-600 flex-1 sm:flex-none"
                          >
                            <Trash2 size={16} className="mr-2 sm:mr-0" />
                            <span className="sm:hidden text-sm">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DeleteProductModal
            isOpen={isModalOpen}
            onClose={closeModal}
            productId={selected.id}
            title={selected.title}
          />
        </div>
      )}

      {totalPages > 1 && (
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-4"
        />
      )}
    </div>
  );
}
