'use client';

interface SortOptionsProps {
  onSort: (value: string) => void;
}

export default function SortOptions({ onSort }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">Sort by:</span>
      <select 
        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSort(e.target.value)}
        defaultValue="date-desc"
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}