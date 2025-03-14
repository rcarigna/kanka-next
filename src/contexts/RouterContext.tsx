'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
// import { useRouter } from 'next/router';
// import { usePathname, useParams } from 'next/navigation';
import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

type RouterContextType = {
  campaignId: string | string[] | null;
  entityType: string | string[] | null;
  entityId: string | string[] | null;
  navigateTo: (path: string) => void;
  additionalParams: Record<string, string | string[] | undefined>;
  pathname: string;
};

export const RouterContext = createContext<RouterContextType | undefined>(
  undefined
);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const campaignId = params?.campaignId || null;
  const entityType = params?.entityType || null;
  const entityId = params?.entityId || null;

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const value = useMemo(
    () => ({
      campaignId,
      entityType,
      entityId,
      navigateTo,
      additionalParams: params,
      pathname,
    }),
    [campaignId, entityType, entityId, navigateTo, params, pathname]
  );
  console.log('RouterProvider value:', value);
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }
  return context;
};
