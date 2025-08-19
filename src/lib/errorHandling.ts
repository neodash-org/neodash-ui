import * as Sentry from '@sentry/nextjs';

// Global error handling utilities for Sentry

export const initializeErrorHandling = () => {
  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    Sentry.captureException(event.error || new Error(event.message), {
      tags: {
        errorType: 'javascript',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
      contexts: {
        error: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      },
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    Sentry.captureException(new Error(event.reason), {
      tags: {
        errorType: 'unhandledrejection',
      },
      contexts: {
        promise: {
          reason: event.reason,
        },
      },
    });
  });

  // Handle network errors
  window.addEventListener('offline', () => {
    Sentry.captureMessage('User went offline', {
      level: 'warning',
      tags: {
        errorType: 'network',
        event: 'offline',
      },
    });
  });

  window.addEventListener('online', () => {
    Sentry.captureMessage('User came back online', {
      level: 'info',
      tags: {
        errorType: 'network',
        event: 'online',
      },
    });
  });
};

// Utility function to capture API errors
export const captureApiError = (
  error: Error | string,
  context: {
    url?: string;
    method?: string;
    statusCode?: number;
    responseData?: Record<string, string | number | boolean | null | undefined>;
    requestData?: Record<string, string | number | boolean | null | undefined>;
  } = {},
) => {
  Sentry.captureException(typeof error === 'string' ? new Error(error) : error, {
    tags: {
      errorType: 'api',
      method: context.method,
      statusCode: context.statusCode,
    },
    contexts: {
      api: {
        url: context.url,
        method: context.method,
        statusCode: context.statusCode,
        responseData: context.responseData,
        requestData: context.requestData,
      },
    },
  });
};

// Utility function to capture user actions that might indicate issues
export const captureUserAction = (
  action: string,
  details: Record<string, string | number | boolean | null | undefined> = {},
) => {
  Sentry.captureMessage(`User action: ${action}`, {
    level: 'info',
    tags: {
      errorType: 'userAction',
      action,
    },
    contexts: {
      userAction: {
        action,
        ...details,
      },
    },
  });
};

// Utility function to set user context
export const setUserContext = (user: {
  id?: string;
  email?: string;
  username?: string;
  walletAddress?: string;
}) => {
  Sentry.setUser(user);
};

// Utility function to add breadcrumb for debugging
export const addBreadcrumb = (
  message: string,
  category: string = 'default',
  data: Record<string, string | number | boolean | null | undefined> = {},
) => {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
  });
};
