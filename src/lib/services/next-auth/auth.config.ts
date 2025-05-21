import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { LoginSchema } from '@/lib/utils/schema';
import { getUserByEmail } from '../auth/user';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials);

        if (validation.success) {
          const { email, password } = validation.data;
          
          const user = await getUserByEmail(email);
          
          if (!user || !user.password) return null;
          
          const passwordMatcher = await bcrypt.compare(password, user.password);
          
          if (passwordMatcher) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
