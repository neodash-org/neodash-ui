import { useCallback } from 'react';
import * as Sentry from '@sentry/nextjs';
import {
  captureApiError,
  captureUserAction,
  setUserContext,
  addBreadcrumb,
} from '@/lib/errorHandling';

// Type for error context
type ErrorContext = Record<string, string | number | boolean | null | undefined>;

export const useErrorTracking = () => {
  // Capture exceptions
  const captureException = useCallback((error: Error, context?: ErrorContext) => {
    Sentry.captureException(error, {
      contexts: {
        custom: context || {},
      },
    });
  }, []);

  // Capture messages
  const captureMessage = useCallback(
    (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
      Sentry.captureMessage(message, { level });
    },
    [],
  );

  // Capture API errors
  const captureApiErrorWithContext = useCallback(
    (
      error: Error | string,
      context: {
        url?: string;
        method?: string;
        statusCode?: number;
        responseData?: ErrorContext;
        requestData?: ErrorContext;
      } = {},
    ) => {
      captureApiError(error, context);
    },
    [],
  );

  // Capture user actions
  const captureUserActionWithDetails = useCallback((action: string, details: ErrorContext = {}) => {
    captureUserAction(action, details);
  }, []);

  // Set user context
  const setUserContextWithData = useCallback(
    (user: { id?: string; email?: string; username?: string; walletAddress?: string }) => {
      setUserContext(user);
    },
    [],
  );

  // Add breadcrumb
  const addBreadcrumbWithData = useCallback(
    (message: string, category: string = 'default', data: ErrorContext = {}) => {
      addBreadcrumb(message, category, data);
    },
    [],
  );

  // Capture wallet connection errors
  const captureWalletError = useCallback((error: Error, walletType: string, walletName: string) => {
    Sentry.captureException(error, {
      tags: {
        errorType: 'wallet',
        walletType,
        walletName,
      },
      contexts: {
        wallet: {
          type: walletType,
          name: walletName,
          error: error.message,
        },
      },
    });
  }, []);

  // Capture bridge transaction errors
  const captureBridgeError = useCallback(
    (
      error: Error,
      context: {
        fromChain: string;
        toChain: string;
        token: string;
        amount: string;
      },
    ) => {
      Sentry.captureException(error, {
        tags: {
          errorType: 'bridge',
          fromChain: context.fromChain,
          toChain: context.toChain,
          token: context.token,
        },
        contexts: {
          bridge: {
            fromChain: context.fromChain,
            toChain: context.toChain,
            token: context.token,
            amount: context.amount,
            error: error.message,
          },
        },
      });
    },
    [],
  );

  return {
    captureException,
    captureMessage,
    captureApiError: captureApiErrorWithContext,
    captureUserAction: captureUserActionWithDetails,
    setUserContext: setUserContextWithData,
    addBreadcrumb: addBreadcrumbWithData,
    captureWalletError,
    captureBridgeError,
  };
};
