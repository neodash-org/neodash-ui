import posthog from 'posthog-js';

// Analytics event properties type
type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

// Analytics event tracking utilities for NeoDash

export const Analytics = {
  // User identification
  identify: (userId: string, properties?: AnalyticsProperties) => {
    posthog.identify(userId, properties || {});
  },

  // Page views
  trackPageView: (pageName: string, properties?: AnalyticsProperties) => {
    posthog.capture('page_viewed', {
      page_name: pageName,
      ...properties,
    });
  },

  // Navigation events
  trackNavigation: (fromPage: string, toPage: string, properties?: AnalyticsProperties) => {
    posthog.capture('navigation', {
      from_page: fromPage,
      to_page: toPage,
      ...properties,
    });
  },

  // Wallet connection events
  trackWalletConnection: (
    walletType: 'evm' | 'svm',
    walletName: string,
    properties?: AnalyticsProperties,
  ) => {
    posthog.capture('wallet_connected', {
      wallet_type: walletType,
      wallet_name: walletName,
      ...properties,
    });
  },

  trackWalletDisconnection: (
    walletType: 'evm' | 'svm',
    walletName: string,
    properties?: AnalyticsProperties,
  ) => {
    posthog.capture('wallet_disconnected', {
      wallet_type: walletType,
      wallet_name: walletName,
      ...properties,
    });
  },

  // Theme events
  trackThemeChange: (fromTheme: string, toTheme: string, properties?: AnalyticsProperties) => {
    posthog.capture('theme_changed', {
      from_theme: fromTheme,
      to_theme: toTheme,
      ...properties,
    });
  },

  // Bridge transaction events
  trackBridgeInitiated: (
    fromChain: string,
    toChain: string,
    token: string,
    amount: string,
    properties?: AnalyticsProperties,
  ) => {
    posthog.capture('bridge_initiated', {
      from_chain: fromChain,
      to_chain: toChain,
      token: token,
      amount: amount,
      ...properties,
    });
  },

  trackBridgeCompleted: (
    fromChain: string,
    toChain: string,
    token: string,
    amount: string,
    txHash: string,
    properties?: AnalyticsProperties,
  ) => {
    posthog.capture('bridge_completed', {
      from_chain: fromChain,
      to_chain: toChain,
      token: token,
      amount: amount,
      transaction_hash: txHash,
      ...properties,
    });
  },

  trackBridgeFailed: (
    fromChain: string,
    toChain: string,
    token: string,
    amount: string,
    error: string,
    properties?: AnalyticsProperties,
  ) => {
    posthog.capture('bridge_failed', {
      from_chain: fromChain,
      to_chain: toChain,
      token: token,
      amount: amount,
      error: error,
      ...properties,
    });
  },

  // Portfolio events
  trackPortfolioView: (properties?: AnalyticsProperties) => {
    posthog.capture('portfolio_viewed', {
      ...properties,
    });
  },

  trackPortfolioRefresh: (properties?: AnalyticsProperties) => {
    posthog.capture('portfolio_refreshed', {
      ...properties,
    });
  },

  // Feature usage events
  trackFeatureUsage: (featureName: string, action: string, properties?: AnalyticsProperties) => {
    posthog.capture('feature_used', {
      feature_name: featureName,
      action: action,
      ...properties,
    });
  },

  // Error tracking
  trackError: (error: string, context: string, properties?: AnalyticsProperties) => {
    posthog.capture('error_occurred', {
      error: error,
      context: context,
      ...properties,
    });
  },

  // Custom events
  capture: (eventName: string, properties?: AnalyticsProperties) => {
    posthog.capture(eventName, properties);
  },

  // Feature flags
  getFeatureFlag: (flagKey: string) => {
    return posthog.getFeatureFlag(flagKey);
  },

  isFeatureEnabled: (flagKey: string) => {
    return posthog.isFeatureEnabled(flagKey);
  },
};
