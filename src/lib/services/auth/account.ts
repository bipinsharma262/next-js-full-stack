import { db } from "@/lib/utils/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    console.log("Account ID Function", error);
    return null;
  }
};