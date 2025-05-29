'use client';

import { useEffect, useState, useTransition, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { ProductSchema } from '@/lib/utils/schema';
import { createProduct, updateProduct } from '@/app/actions/products';
import { Button } from '@/app/components/ui/Button';
import { FormField } from '@/app/components/ui/FormField';
import AIGenerateDescription from '@/app/(main)/components/forms/AIGenerateDescription';
import ImageUpload from '@/app/(main)/components/forms/ImageUpload';

type ProductFormValues = z.infer<typeof ProductSchema>;

interface ProductFormProps {
  data: {
    title: string;
    description: string | null;
    image: string | null;
    id?:string
  } | null;
}

export default function ProductForm({ data }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormValues>({
    title: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormValues, string>>>({});
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
      });
    }
  }, [data]);

  const validateField = (field: keyof ProductFormValues, value: string) => {
    const result = ProductSchema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.errors[0]?.message,
    }));
  };

  const handleChange = (field: keyof ProductFormValues, value: string) => {
    validateField(field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = ProductSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.errors) {
        const field = issue.path[0] as keyof ProductFormValues;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    startTransition(() => {
      const action = data ? updateProduct(formData, String(data?.id)) : createProduct(formData);

      action
        .then((res) => {
          if (res?.error) {
            alert(res.error);
          } else {
            alert(res.success);
            router.push('/products');
          }
        })
        .catch((err) => {
          console.error('Form submission failed:', err);
          alert('Something went wrong');
        });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        placeholder="Enter product title"
      />

      <AIGenerateDescription
        title={formData.title}
        description={formData.description}
        handleChange={handleChange}
        error={errors.description}
      />

      <ImageUpload
        value={formData.image}
        handleChange={(value) => handleChange('image', value)}
        disabled={loading}
      />

      <div className="mt-8 flex justify-end gap-4">
        <Button
          type="reset"
          variant="outline"
          className="hover:bg-gray-100 transition-colors"
          onClick={() => {
            setFormData({ title: '', description: '', image: '' });
            setErrors({});
          }}
        >
          Clear
        </Button>

        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : data ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
