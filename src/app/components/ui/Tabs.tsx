'use client';

import { cn } from '@/lib/utils';
import React, {
  ButtonHTMLAttributes,
  createContext,
  forwardRef,
  HTMLAttributes,
  useContext,
  useMemo,
  useState,
} from 'react';

interface TabState {
  activeTab: string | undefined;
  setActiveTab: (activeTab: string) => void;
}

const TabContext = createContext<TabState | null>(null);

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ className, defaultValue, ...props }, ref) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultValue);

  const value = useMemo(() => {
    return {
      activeTab,
      setActiveTab,
    };
  }, [activeTab]);
  return (
    <TabContext.Provider value={value}>
      <div ref={ref} className={cn(`max-w-md mx-auto`, className)} {...props} />
    </TabContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Context Error');
  }
  return context;
};

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(`flex rounded-md bg-gray-100 p-1 mb-4`, className)} {...props} />
  )
);

TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTab();
    return (
      <button
        ref={ref}
        className={cn(
          `flex-1 py-2 text-md font-medium text-center rounded-md transition-colors`,
          activeTab === value
            ? 'bg-white shadow text-black ring-1 ring-zinc-200'
            : 'text-gray-500 hover:text-gray-700',
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab } = useTab();
    if (activeTab === value) {
      return (
        <div
          ref={ref}
          className={cn(
            ` mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
            className
          )}
          {...props}
        />
      );
    }

    return null;
  }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
