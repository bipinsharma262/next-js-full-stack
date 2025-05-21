'use server';

import bcrypt from 'bcryptjs';
import cryptoRandomString from 'crypto-random-string';
import { z } from 'zod';

import { OTPRequestSchema, OTPVerifySchema, SignUpSchema } from '@/lib/utils/schema';
import { createUser } from '@/lib/services/auth/createUser';
import { CreateOTP, DeleteManyOTP, GetOTPByUserId } from '@/lib/services/auth/otp';
import { getUserAndOTPByEmail, getUserByEmail } from '@/lib/services/auth/user';
import { sendMail } from '@/lib/services/email/email';

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validation = SignUpSchema.safeParse(values);

  if (!validation.success) {
    return { error: 'Invalid Fields' };
  }

  const { name, email, password } = validation.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use' };
  }

  await createUser({ name, email, password: hashPassword });

  return { success: 'User created Successfully' };
};

export const requestOTP = async (values: z.infer<typeof OTPRequestSchema>) => {
  const validation = OTPRequestSchema.safeParse(values);

  if (!validation.success) {
    return {
      error: 'Invalid Fields',
    };
  }

  const { email } = validation.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) return { error: 'Email does not exist' };

  const otp = cryptoRandomString({ length: 6, type: 'numeric' });
  const hashedOTP = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  await CreateOTP({ expiresAt, code: hashedOTP, userId: existingUser.id });

  try {
    await sendMail({ email, otp });
  } catch (error) {
    console.log('Error sending Email', error);
  }

  return { success: 'OTP Sent Successfully' };
};

export const verifyOTP = async (values: z.infer<typeof OTPVerifySchema>) => {
  const validation = OTPVerifySchema.safeParse(values);

  if (!validation.success) {
    return { error: 'Invalid Fields' };
  }

  const { email, otp } = validation.data;

  const existingUser = await getUserAndOTPByEmail(email);

  if (!existingUser || !existingUser.email) return { error: 'Email does not exist ' };

  const otpRecords = await GetOTPByUserId({ userId: existingUser.id });
  if (!otpRecords)
    return {
      error: 'No OTP FOUND',
    };

  const otpMatcher = await bcrypt.compare(otp, otpRecords.code);

  if (otpMatcher) {
    await DeleteManyOTP(otpRecords.id);
    return {
      success: 'Logged in successfully',
    };
  }

  return { error: 'Invalid OTP' };
};
