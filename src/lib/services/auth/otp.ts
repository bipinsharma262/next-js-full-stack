import { db } from '@/lib/utils/db';

export async function GetOTPByUserId({ userId }: { userId: string}) {
  try {
    return await db.oTP.findFirst({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.log('OTP Function Error', error);
    return null;
  }
}

export async function CreateOTP({
  userId,
  code,
  expiresAt,
}: {
  userId: string;
  code: string;
  expiresAt: Date;
}) {
  try {
    return await db.oTP.create({
      data: {
        code,
        userId,
        expiresAt,
      },
    });
  } catch (error) {
    console.log('OTP Create Function Error', error);
    return null;
  }
}

export async function DeleteManyOTP(OTPRecordId: string) {
  return await db.oTP.deleteMany({ where: { id: OTPRecordId } });
}