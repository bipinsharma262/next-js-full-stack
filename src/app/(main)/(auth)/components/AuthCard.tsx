import { BookOpenCheck } from 'lucide-react';
import React from 'react';
import { Card } from '@/app/components/ui/Card';
import { GoogleLogin } from './GoogleButton';
import styles from '../css/authCard.module.css';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  redirect: string
}

export default function AuthCard({ children, title, description,redirect }: AuthCardProps) {
  return (
    <Card className={styles.card}>
      <div className={cn(styles.headerGradient,'bg-gradient-to-r from-blue-500 to-purple-500')}>
        <BookOpenCheck className={styles.brandIcon} />
        <span className={styles.brandText}>ProductHub</span>
      </div>
      <div className={styles.contentContainer}>
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          {children}
          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>
              <span className="px-2 bg-white">Or continue with</span>
            </div>
          </div>
          <GoogleLogin redirect={redirect} />
        </div>
      </div>
    </Card>
  );
}
