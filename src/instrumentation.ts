import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');

    // Suppress known SSR errors from wallet libraries (development only)
    if (process.env.NODE_ENV === 'development') {
      const originalUnhandledRejection = process.listeners('unhandledRejection');
      process.removeAllListeners('unhandledRejection');

      process.on('unhandledRejection', (reason: unknown) => {
        // Suppress known WalletConnect SSR errors
        const errorStr = reason?.toString() || '';
        if (
          errorStr.includes('indexedDB is not defined') ||
          errorStr.includes('WalletConnect Core is already initialized')
        ) {
          // Silently ignore these development-only errors
          return;
        }

        // Re-emit other unhandled rejections
        originalUnhandledRejection.forEach((listener: NodeJS.UnhandledRejectionListener) => {
          listener(reason, Promise.reject(reason));
        });
      });
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
