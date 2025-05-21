'use client';

import React, { useTransition } from 'react';
import { Button } from '@/app/components/ui/Button';
import { deleteProduct } from '@/app/actions/products';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  title: string;
}

export default function DeleteProductModal({
  isOpen,
  onClose,
  productId,
  title,
}: DeleteProductModalProps) {
  const [loading, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleDelete = () => {
    startTransition(() => {
      deleteProduct(productId).then((response) => {
        alert(response.success);
        onClose();
      });
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
        <p className="mb-4">
          Are you sure you want to delete <span className="font-semibold">{title}</span>?
        </p>
        <p className="text-gray-600 mb-6">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="!text-white"
            onClick={handleDelete}
          >
            {loading ? 'Deleting…' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
