'use client';

import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  isGridView: boolean;
  onViewChange: (isGrid: boolean) => void;
}

export default function ViewToggle({ isGridView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-lg">
      <Button
        variant={isGridView ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange(true)}
        className={cn('rounded-md', isGridView ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : '')}
      >
        <Grid size={16} className="mr-1" /> Grid
      </Button>
      <Button
        variant={!isGridView ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange(false)}
        className={cn('rounded-md', !isGridView ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : '')}
      >
        <List size={16} className="mr-1" /> List
      </Button>
    </div>
  );
} 
