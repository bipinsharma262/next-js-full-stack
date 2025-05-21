'use client';

import { Card } from '@/app/components/ui/Card';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onFilter: (filter: string) => void;
}

export default function SearchFilter({ onSearch, onFilter }: SearchFilterProps) {
  return (
    <Card className="glass-panel p-6 mb-8 border border-gray-200/50">
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          onChange={(e) => onFilter(e.target.value)}
          defaultValue="all"
        >
          <option value="all">All Products</option>
          <option value="has-image">With Image</option>
          <option value="no-image">Without Image</option>
          <option value="has-description">With Description</option>
          <option value="no-description">Without Description</option>
        </select>
      </div>
    </Card>
  );
}
