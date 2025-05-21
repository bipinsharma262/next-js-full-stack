import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT) || 587,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendMail = async ({ email, otp }: { email: string; otp: string }) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: 'Your Secure OTP Code',
    text: `Your secure OTP code is: ${otp}. It expires in 2 minutes.`,
  });
};
