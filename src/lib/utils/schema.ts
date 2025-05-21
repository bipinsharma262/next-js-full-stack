import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const SignUpSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is Required',
  }),
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const OTPRequestSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
});

export const OTPVerifySchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
  otp: z.string().regex(/^\d{6}$/, { message: 'OTP must be 6 digits' }),
});

export const ProductSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is Required',
  }),
  description: z.string().min(1, {
    message: 'Description is Required',
  }),
  image: z.string().min(1, { message: 'Featured image is required' }),
});

export const OrderSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  cardNumber: z.string().min(16, {
    message: "Card number is required"
  }),
  expiry: z.string().min(5, {
    message: "Expiry date is required"
  }),
  cvc: z.string().min(3, {
    message: "CVC is required"
  }),
  amount: z.number(),
  productId: z.string()
})