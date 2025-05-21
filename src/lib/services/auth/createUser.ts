import { db } from '@/lib/utils/db';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export async function createUser({ name, email, password }: CreateUserProps) {
  try {
    return await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    console.log('User Create Function', error);
    return null;
  }
}