'use server';

import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { db } from '@/lib/utils/db';
import { ProductSchema } from '@/lib/utils/schema';
import { getUserById } from '@/lib/services/auth/user';
import { authOptions } from '@/lib/services/next-auth/auth';
import { deleteFromCloudinary } from '@/lib/services/product/cloudinary';
import { getAllProducts, getProductById } from '@/lib/services/product/product';

export async function allProducts() {
  return await getAllProducts();
}

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      error: 'You must be logged in to create a product.',
    };
  }

  const validation = ProductSchema.safeParse(values);

  if (!validation.success) {
    return {
      error: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { title, description, image } = validation.data;
  try {
    await db.product.create({
      data: {
        title,
        description,
        image,
      },
    });

    revalidateTag('products');
    revalidateTag('admin-products')
    return {
      success: 'Product created successfully.',
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Failed to create product.',
    };
  }
};

export const updateProduct = async (values: z.infer<typeof ProductSchema>, productId: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      error: 'You must be logged in to update a product.',
    };
  }

  const validation = ProductSchema.safeParse(values);

  if (!validation.success) {
    return {
      error: 'Missing Fields. Failed to Update Product.',
    };
  }

  const { title, description, image } = validation.data;



  const existingProduct = await getProductById(productId);

  if (!existingProduct) {
    return {
      error: 'Product not found.',
    };
  }

  try {
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        title,
        description,
        image,
      },
    });

    revalidateTag('products');
    revalidateTag('admin-products')
    return {
      success: 'Product updated successfully.',
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Failed to update product.',
    };
  }
};

export const deleteProduct = async (productId: string) => {

  const existingProduct = await getProductById(productId);

  if (!existingProduct) {
    return {
      error: 'Product not found.',
    };
  }

  try {
    await deleteFromCloudinary(existingProduct.image as string);
    await db.product.delete({
      where: {
        id: productId,
      },
    });

    revalidateTag('products');
    return {
      success: 'Product deleted successfully.',
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Failed to delete product.',
    };
  }
};
