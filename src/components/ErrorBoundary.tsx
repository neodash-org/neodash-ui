'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
      tags: {
        errorBoundary: 'true',
      },
    });

    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-bg-main text-white">
            <div className="text-center p-8">
              <div className="text-neon-pink text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold mb-4 text-neon-pink">Something went wrong</h1>
              <p className="text-white/70 mb-6">
                We&apos;ve been notified and are working to fix this issue.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-neon-cyan text-white px-6 py-3 rounded-lg hover:bg-neon-cyan/80 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
