import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  initializeErrorHandling,
  captureApiError,
  captureUserAction,
  setUserContext,
  addBreadcrumb,
} from '../errorHandling';

// Mock @sentry/nextjs
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  setUser: vi.fn(),
  addBreadcrumb: vi.fn(),
}));

import * as Sentry from '@sentry/nextjs';

describe('Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window object
    Object.defineProperty(window, 'addEventListener', {
      value: vi.fn(),
      writable: true,
    });
  });

  describe('initializeErrorHandling', () => {
    it('should set up global error handlers', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      initializeErrorHandling();

      expect(addEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('offline', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function));
    });
  });

  describe('captureApiError', () => {
    it('should capture API error with context', () => {
      const error = new Error('API request failed');
      const context = {
        url: '/api/data',
        method: 'GET',
        statusCode: 500,
        responseData: { error: 'Internal server error' },
        requestData: { id: '123' },
      };

      captureApiError(error, context);

      expect(Sentry.captureException).toHaveBeenCalledWith(error, {
        tags: {
          errorType: 'api',
          method: 'GET',
          statusCode: 500,
        },
        contexts: {
          api: {
            url: '/api/data',
            method: 'GET',
            statusCode: 500,
            responseData: { error: 'Internal server error' },
            requestData: { id: '123' },
          },
        },
      });
    });

    it('should capture string error', () => {
      const error = 'Network timeout';
      const context = { url: '/api/data' };

      captureApiError(error, context);

      expect(Sentry.captureException).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Network timeout' }),
        expect.objectContaining({
          tags: { errorType: 'api' },
        }),
      );
    });
  });

  describe('captureUserAction', () => {
    it('should capture user action with details', () => {
      const action = 'button_clicked';
      const details = { button_id: 'connect_wallet', location: 'header' };

      captureUserAction(action, details);

      expect(Sentry.captureMessage).toHaveBeenCalledWith('User action: button_clicked', {
        level: 'info',
        tags: {
          errorType: 'userAction',
          action: 'button_clicked',
        },
        contexts: {
          userAction: {
            action: 'button_clicked',
            button_id: 'connect_wallet',
            location: 'header',
          },
        },
      });
    });
  });

  describe('setUserContext', () => {
    it('should set user context in Sentry', () => {
      const user = {
        id: 'user123',
        email: 'test@example.com',
        username: 'testuser',
        walletAddress: '0x123...',
      };

      setUserContext(user);

      expect(Sentry.setUser).toHaveBeenCalledWith(user);
    });

    it('should set partial user context', () => {
      const user = {
        id: 'user123',
        email: 'test@example.com',
      };

      setUserContext(user);

      expect(Sentry.setUser).toHaveBeenCalledWith(user);
    });
  });

  describe('addBreadcrumb', () => {
    it('should add breadcrumb with data', () => {
      const message = 'User navigated to portfolio';
      const category = 'navigation';
      const data = { from: '/dashboard', to: '/portfolio' };

      addBreadcrumb(message, category, data);

      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
        message,
        category,
        data,
        level: 'info',
      });
    });

    it('should add breadcrumb with default category', () => {
      const message = 'Component mounted';
      const data = { component: 'Dashboard' };

      addBreadcrumb(message, undefined, data);

      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
        message,
        category: 'default',
        data,
        level: 'info',
      });
    });
  });
});
