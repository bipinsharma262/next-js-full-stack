import { db } from '@/lib/utils/db';

export async function getUserById(id: string | undefined) {
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log('User ID Function', error);
    return null;
  }
}

export async function getUserByEmail(email: string | undefined) {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.log('User ID Function', error);
    return null;
  }
}

export async function getUserAndOTPByEmail(email: string | undefined) {
  try{
    return await db.user.findFirst({
      where: {
        email,
      },
      include: {
        otps: true
      }
    })
  }
  catch (error) {
    console.log('OTP Email Function', error);
    return null;
  }
}