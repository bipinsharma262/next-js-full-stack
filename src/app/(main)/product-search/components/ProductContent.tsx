'use client';

import { Product } from "@prisma/client";
import { useState } from "react";
import ProductsDisplay from "@/app/(main)/product-search/components/ProductDisplay";
import SearchFilter from "@/app/(main)/product-search/components/SearchFilter";
import SortOptions from "@/app/(main)/product-search/components/SortOptions";
import ViewToggle from "@/app/(main)/product-search/components/ViewToggle";

export default function ProductsContent({ initialProducts }: { initialProducts: Product[] | null }) {
  const [isGridView, setIsGridView] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState<Product[] | null>(initialProducts);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setDisplayedProducts(initialProducts);
      return;
    }

    const searchTerm = term.toLowerCase();
    const filtered = initialProducts?.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm)
    );
    setDisplayedProducts(filtered || null);
  };

  const handleFilter = (filter: string) => {
    if (!filter || filter === 'all') {
      setDisplayedProducts(initialProducts);
      return;
    }

    const filtered = initialProducts?.filter(product => {
      switch (filter) {
        case 'has-image':
          return !!product.image;
        case 'no-image':
          return !product.image;
        case 'has-description':
          return !!product.description;
        case 'no-description':
          return !product.description;
        default:
          return true;
      }
    });
    setDisplayedProducts(filtered || null);
  };

  const handleSort = (sortBy: string) => {
    if (!displayedProducts) return;

    const sorted = [...displayedProducts];
    switch (sortBy) {
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        return;
    }
    setDisplayedProducts(sorted);
  };

  return (
    <>
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter}/>
      
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <ViewToggle isGridView={isGridView} onViewChange={setIsGridView} />
        <SortOptions onSort={handleSort} />
      </div>

      <ProductsDisplay products={displayedProducts} isGridView={isGridView} />
    </>
  );
}
