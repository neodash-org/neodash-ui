import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Analytics } from '../analytics';

// Mock posthog-js
vi.mock('posthog-js', () => ({
  default: {
    capture: vi.fn(),
    identify: vi.fn(),
    getFeatureFlag: vi.fn(),
    isFeatureEnabled: vi.fn(),
  },
}));

import posthog from 'posthog-js';

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('identify', () => {
    it('should call posthog.identify with user ID and properties', () => {
      const userId = 'user123';
      const properties = { email: 'test@example.com' };

      Analytics.identify(userId, properties);

      expect(posthog.identify).toHaveBeenCalledWith(userId, properties);
    });

    it('should call posthog.identify with only user ID', () => {
      const userId = 'user123';

      Analytics.identify(userId);

      expect(posthog.identify).toHaveBeenCalledWith(userId, undefined);
    });
  });

  describe('trackPageView', () => {
    it('should capture page view with properties', () => {
      const pageName = 'Dashboard';
      const properties = { section: 'main' };

      Analytics.trackPageView(pageName, properties);

      expect(posthog.capture).toHaveBeenCalledWith('page_viewed', {
        page_name: pageName,
        ...properties,
      });
    });
  });

  describe('trackNavigation', () => {
    it('should capture navigation event', () => {
      const fromPage = '/dashboard';
      const toPage = '/portfolio';
      const properties = { navigation_type: 'sidebar' };

      Analytics.trackNavigation(fromPage, toPage, properties);

      expect(posthog.capture).toHaveBeenCalledWith('navigation', {
        from_page: fromPage,
        to_page: toPage,
        ...properties,
      });
    });
  });

  describe('trackWalletConnection', () => {
    it('should capture wallet connection event', () => {
      const walletType = 'evm';
      const walletName = 'MetaMask';
      const properties = { connection_method: 'header' };

      Analytics.trackWalletConnection(walletType, walletName, properties);

      expect(posthog.capture).toHaveBeenCalledWith('wallet_connected', {
        wallet_type: walletType,
        wallet_name: walletName,
        ...properties,
      });
    });
  });

  describe('trackThemeChange', () => {
    it('should capture theme change event', () => {
      const fromTheme = 'light';
      const toTheme = 'dark';
      const properties = { source: 'sidebar' };

      Analytics.trackThemeChange(fromTheme, toTheme, properties);

      expect(posthog.capture).toHaveBeenCalledWith('theme_changed', {
        from_theme: fromTheme,
        to_theme: toTheme,
        ...properties,
      });
    });
  });

  describe('trackBridgeInitiated', () => {
    it('should capture bridge initiated event', () => {
      const fromChain = 'ethereum';
      const toChain = 'polygon';
      const token = 'USDC';
      const amount = '100';
      const properties = { user_id: 'user123' };

      Analytics.trackBridgeInitiated(fromChain, toChain, token, amount, properties);

      expect(posthog.capture).toHaveBeenCalledWith('bridge_initiated', {
        from_chain: fromChain,
        to_chain: toChain,
        token: token,
        amount: amount,
        ...properties,
      });
    });
  });

  describe('trackBridgeCompleted', () => {
    it('should capture bridge completed event', () => {
      const fromChain = 'ethereum';
      const toChain = 'polygon';
      const token = 'USDC';
      const amount = '100';
      const txHash = '0x123...';
      const properties = { user_id: 'user123' };

      Analytics.trackBridgeCompleted(fromChain, toChain, token, amount, txHash, properties);

      expect(posthog.capture).toHaveBeenCalledWith('bridge_completed', {
        from_chain: fromChain,
        to_chain: toChain,
        token: token,
        amount: amount,
        transaction_hash: txHash,
        ...properties,
      });
    });
  });

  describe('trackBridgeFailed', () => {
    it('should capture bridge failed event', () => {
      const fromChain = 'ethereum';
      const toChain = 'polygon';
      const token = 'USDC';
      const amount = '100';
      const error = 'Insufficient balance';
      const properties = { user_id: 'user123' };

      Analytics.trackBridgeFailed(fromChain, toChain, token, amount, error, properties);

      expect(posthog.capture).toHaveBeenCalledWith('bridge_failed', {
        from_chain: fromChain,
        to_chain: toChain,
        token: token,
        amount: amount,
        error: error,
        ...properties,
      });
    });
  });

  describe('trackPortfolioView', () => {
    it('should capture portfolio view event', () => {
      const properties = { total_value: '$123,456' };

      Analytics.trackPortfolioView(properties);

      expect(posthog.capture).toHaveBeenCalledWith('portfolio_viewed', properties);
    });
  });

  describe('trackFeatureUsage', () => {
    it('should capture feature usage event', () => {
      const featureName = 'dark_mode';
      const action = 'toggled';
      const properties = { source: 'header' };

      Analytics.trackFeatureUsage(featureName, action, properties);

      expect(posthog.capture).toHaveBeenCalledWith('feature_used', {
        feature_name: featureName,
        action: action,
        ...properties,
      });
    });
  });

  describe('trackError', () => {
    it('should capture error event', () => {
      const error = 'Wallet connection failed';
      const context = 'header_wallet_connect';
      const properties = { error_code: 'user_rejected' };

      Analytics.trackError(error, context, properties);

      expect(posthog.capture).toHaveBeenCalledWith('error_occurred', {
        error: error,
        context: context,
        ...properties,
      });
    });
  });

  describe('capture', () => {
    it('should capture custom event', () => {
      const eventName = 'custom_event';
      const properties = { custom_prop: 'value' };

      Analytics.capture(eventName, properties);

      expect(posthog.capture).toHaveBeenCalledWith(eventName, properties);
    });
  });

  describe('getFeatureFlag', () => {
    it('should get feature flag value', () => {
      const flagKey = 'new_feature';
      const mockValue = true;
      (posthog.getFeatureFlag as ReturnType<typeof vi.fn>).mockReturnValue(mockValue);

      const result = Analytics.getFeatureFlag(flagKey);

      expect(posthog.getFeatureFlag).toHaveBeenCalledWith(flagKey);
      expect(result).toBe(mockValue);
    });
  });

  describe('isFeatureEnabled', () => {
    it('should check if feature is enabled', () => {
      const flagKey = 'new_feature';
      const mockValue = true;
      (posthog.isFeatureEnabled as ReturnType<typeof vi.fn>).mockReturnValue(mockValue);

      const result = Analytics.isFeatureEnabled(flagKey);

      expect(posthog.isFeatureEnabled).toHaveBeenCalledWith(flagKey);
      expect(result).toBe(mockValue);
    });
  });
});
