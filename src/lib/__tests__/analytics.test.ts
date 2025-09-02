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

describe('Analytics', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPostHog: any;

  beforeEach(async () => {
    // Get the mocked posthog instance
    mockPostHog = (await import('posthog-js')).default;

    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('identify', () => {
    it('should call posthog.identify with user ID and properties', () => {
      const properties = { name: 'John Doe', email: 'john@example.com' };
      Analytics.identify('user123', properties);

      expect(mockPostHog.identify).toHaveBeenCalledWith('user123', properties);
    });

    it('should call posthog.identify with user ID only', () => {
      Analytics.identify('user123');

      expect(mockPostHog.identify).toHaveBeenCalledWith('user123', {});
    });
  });

  describe('trackPageView', () => {
    it('should call posthog.capture with page_viewed event', () => {
      const properties = { referrer: 'google.com' };
      Analytics.trackPageView('dashboard', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('page_viewed', {
        page_name: 'dashboard',
        referrer: 'google.com',
      });
    });

    it('should call posthog.capture with page_viewed event without properties', () => {
      Analytics.trackPageView('dashboard');

      expect(mockPostHog.capture).toHaveBeenCalledWith('page_viewed', {
        page_name: 'dashboard',
      });
    });
  });

  describe('trackNavigation', () => {
    it('should call posthog.capture with navigation event', () => {
      const properties = { navigation_type: 'sidebar' };
      Analytics.trackNavigation('/dashboard', '/portfolio', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('navigation', {
        from_page: '/dashboard',
        to_page: '/portfolio',
        navigation_type: 'sidebar',
      });
    });
  });

  describe('trackWalletConnection', () => {
    it('should call posthog.capture with wallet_connected event', () => {
      const properties = { connection_method: 'metamask' };
      Analytics.trackWalletConnection('evm', 'MetaMask', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('wallet_connected', {
        wallet_type: 'evm',
        wallet_name: 'MetaMask',
        connection_method: 'metamask',
      });
    });
  });

  describe('trackThemeChange', () => {
    it('should call posthog.capture with theme_changed event', () => {
      const properties = { source: 'sidebar' };
      Analytics.trackThemeChange('light', 'dark', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('theme_changed', {
        from_theme: 'light',
        to_theme: 'dark',
        source: 'sidebar',
      });
    });
  });

  describe('trackBridgeInitiated', () => {
    it('should call posthog.capture with bridge_initiated event', () => {
      const properties = { user_wallet: '0x123...' };
      Analytics.trackBridgeInitiated('ethereum', 'polygon', 'USDC', '100', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('bridge_initiated', {
        from_chain: 'ethereum',
        to_chain: 'polygon',
        token: 'USDC',
        amount: '100',
        user_wallet: '0x123...',
      });
    });
  });

  describe('trackBridgeCompleted', () => {
    it('should call posthog.capture with bridge_completed event', () => {
      const properties = { gas_used: '50000' };
      Analytics.trackBridgeCompleted('ethereum', 'polygon', 'USDC', '100', '0xabc...', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('bridge_completed', {
        from_chain: 'ethereum',
        to_chain: 'polygon',
        token: 'USDC',
        amount: '100',
        transaction_hash: '0xabc...',
        gas_used: '50000',
      });
    });
  });

  describe('trackBridgeFailed', () => {
    it('should call posthog.capture with bridge_failed event', () => {
      const properties = { error_code: 'INSUFFICIENT_FUNDS' };
      Analytics.trackBridgeFailed(
        'ethereum',
        'polygon',
        'USDC',
        '100',
        'Insufficient balance',
        properties,
      );

      expect(mockPostHog.capture).toHaveBeenCalledWith('bridge_failed', {
        from_chain: 'ethereum',
        to_chain: 'polygon',
        token: 'USDC',
        amount: '100',
        error: 'Insufficient balance',
        error_code: 'INSUFFICIENT_FUNDS',
      });
    });
  });

  describe('trackPortfolioView', () => {
    it('should call posthog.capture with portfolio_viewed event', () => {
      const properties = { view_type: 'detailed' };
      Analytics.trackPortfolioView(properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('portfolio_viewed', {
        view_type: 'detailed',
      });
    });
  });

  describe('trackPortfolioRefresh', () => {
    it('should call posthog.capture with portfolio_refreshed event', () => {
      const properties = { refresh_method: 'manual' };
      Analytics.trackPortfolioRefresh(properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('portfolio_refreshed', {
        refresh_method: 'manual',
      });
    });
  });

  describe('trackFeatureUsage', () => {
    it('should call posthog.capture with feature_used event', () => {
      const properties = { user_type: 'premium' };
      Analytics.trackFeatureUsage('bridge', 'initiated', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('feature_used', {
        feature_name: 'bridge',
        action: 'initiated',
        user_type: 'premium',
      });
    });
  });

  describe('trackError', () => {
    it('should call posthog.capture with error event', () => {
      const properties = { error_type: 'network' };
      Analytics.trackError('API request failed', 'api_call', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('error_occurred', {
        error: 'API request failed',
        context: 'api_call',
        error_type: 'network',
      });
    });
  });

  describe('capture', () => {
    it('should call posthog.capture with custom event', () => {
      const properties = { custom_prop: 'value' };
      Analytics.capture('custom_event', properties);

      expect(mockPostHog.capture).toHaveBeenCalledWith('custom_event', properties);
    });
  });

  describe('getFeatureFlag', () => {
    it('should call posthog.getFeatureFlag', () => {
      Analytics.getFeatureFlag('beta_feature');

      expect(mockPostHog.getFeatureFlag).toHaveBeenCalledWith('beta_feature');
    });
  });

  describe('isFeatureEnabled', () => {
    it('should call posthog.isFeatureEnabled', () => {
      Analytics.isFeatureEnabled('beta_feature');

      expect(mockPostHog.isFeatureEnabled).toHaveBeenCalledWith('beta_feature');
    });
  });
});
