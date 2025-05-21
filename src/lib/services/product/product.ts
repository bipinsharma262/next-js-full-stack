import { db } from '@/lib/utils/db';
import { unstable_cache } from 'next/cache';

export const getProductById = async (id: string) => {
  try {
    return await unstable_cache(
      async () => {
        return await db.product.findUnique({
          where: {
            id,
          },
        });
      },
      ['product', id],
      {
        tags: ['products', `product-${id}`],
        revalidate: 3600,
      }
    )();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllProductsByUserId = async (id: string) => {
  try {
    return await unstable_cache(
      async () => {
        return await db.product.findMany({
          where: {
            userId: id,
          },
        });
      },
      ['products', `user-${id}`],
      {
        tags: ['products'],
        revalidate: 3600,
      }
    )();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllProducts = unstable_cache(
  async () => {
    const products = await db.product.findMany();
    return products;
  },
  ['products'],
  {
    tags: ['products'],
    revalidate: 60,
  }
);
