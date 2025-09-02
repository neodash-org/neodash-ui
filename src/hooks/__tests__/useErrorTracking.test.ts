import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useErrorTracking } from '../useErrorTracking';

// Mock @sentry/nextjs
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

// Mock error handling utilities
vi.mock('@/lib/errorHandling', () => ({
  captureApiError: vi.fn(),
  captureUserAction: vi.fn(),
  setUserContext: vi.fn(),
  addBreadcrumb: vi.fn(),
}));

import * as Sentry from '@sentry/nextjs';
import {
  captureApiError,
  captureUserAction,
  setUserContext,
  addBreadcrumb,
} from '@/lib/errorHandling';

describe('useErrorTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide error tracking functions', () => {
    const { result } = renderHook(() => useErrorTracking());

    expect(result.current).toHaveProperty('captureException');
    expect(result.current).toHaveProperty('captureMessage');
    expect(result.current).toHaveProperty('captureApiError');
    expect(result.current).toHaveProperty('captureUserAction');
    expect(result.current).toHaveProperty('setUserContext');
    expect(result.current).toHaveProperty('addBreadcrumb');
    expect(result.current).toHaveProperty('captureWalletError');
    expect(result.current).toHaveProperty('captureBridgeError');
  });

  describe('captureException', () => {
    it('should capture exception with context', () => {
      const { result } = renderHook(() => useErrorTracking());
      const error = new Error('Test error');
      const context = { component: 'TestComponent' };

      result.current.captureException(error, context);

      expect(Sentry.captureException).toHaveBeenCalledWith(error, {
        contexts: {
          custom: context,
        },
      });
    });
  });

  describe('captureMessage', () => {
    it('should capture message with default level', () => {
      const { result } = renderHook(() => useErrorTracking());
      const message = 'Test message';

      result.current.captureMessage(message);

      expect(Sentry.captureMessage).toHaveBeenCalledWith(message, { level: 'info' });
    });

    it('should capture message with custom level', () => {
      const { result } = renderHook(() => useErrorTracking());
      const message = 'Test error message';

      result.current.captureMessage(message, 'error');

      expect(Sentry.captureMessage).toHaveBeenCalledWith(message, { level: 'error' });
    });
  });

  describe('captureApiError', () => {
    it('should capture API error with context', () => {
      const { result } = renderHook(() => useErrorTracking());
      const error = new Error('API error');
      const context = {
        url: '/api/test',
        method: 'GET',
        statusCode: 500,
      };

      result.current.captureApiError(error, context);

      expect(captureApiError).toHaveBeenCalledWith(error, context);
    });
  });

  describe('captureUserAction', () => {
    it('should capture user action with details', () => {
      const { result } = renderHook(() => useErrorTracking());
      const action = 'button_click';
      const details = { button_id: 'test_button' };

      result.current.captureUserAction(action, details);

      expect(captureUserAction).toHaveBeenCalledWith(action, details);
    });
  });

  describe('setUserContext', () => {
    it('should set user context', () => {
      const { result } = renderHook(() => useErrorTracking());
      const user = {
        id: 'user123',
        email: 'test@example.com',
        walletAddress: '0x123...',
      };

      result.current.setUserContext(user);

      expect(setUserContext).toHaveBeenCalledWith(user);
    });
  });

  describe('addBreadcrumb', () => {
    it('should add breadcrumb with data', () => {
      const { result } = renderHook(() => useErrorTracking());
      const message = 'User action';
      const category = 'navigation';
      const data = { from: '/dashboard', to: '/portfolio' };

      result.current.addBreadcrumb(message, category, data);

      expect(addBreadcrumb).toHaveBeenCalledWith(message, category, data);
    });
  });

  describe('captureWalletError', () => {
    it('should capture wallet error with context', () => {
      const { result } = renderHook(() => useErrorTracking());
      const error = new Error('Wallet connection failed');
      const walletType = 'evm';
      const walletName = 'MetaMask';

      result.current.captureWalletError(error, walletType, walletName);

      expect(Sentry.captureException).toHaveBeenCalledWith(error, {
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
    });
  });

  describe('captureBridgeError', () => {
    it('should capture bridge error with context', () => {
      const { result } = renderHook(() => useErrorTracking());
      const error = new Error('Bridge transaction failed');
      const context = {
        fromChain: 'ethereum',
        toChain: 'polygon',
        token: 'USDC',
        amount: '100',
      };

      result.current.captureBridgeError(error, context);

      expect(Sentry.captureException).toHaveBeenCalledWith(error, {
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
    });
  });
});
