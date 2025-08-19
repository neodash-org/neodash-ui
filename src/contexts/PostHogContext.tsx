'use client';

import { PostHogProvider as PHProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import { ReactNode } from 'react';

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
