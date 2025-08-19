import { usePostHog as usePostHogHook } from 'posthog-js/react';
import { Analytics } from '@/lib/analytics';

export const usePostHog = () => {
  const posthog = usePostHogHook();

  return {
    posthog,
    analytics: Analytics,
    // Convenience methods
    identify: Analytics.identify,
    trackPageView: Analytics.trackPageView,
    trackNavigation: Analytics.trackNavigation,
    trackWalletConnection: Analytics.trackWalletConnection,
    trackWalletDisconnection: Analytics.trackWalletDisconnection,
    trackThemeChange: Analytics.trackThemeChange,
    trackBridgeInitiated: Analytics.trackBridgeInitiated,
    trackBridgeCompleted: Analytics.trackBridgeCompleted,
    trackBridgeFailed: Analytics.trackBridgeFailed,
    trackPortfolioView: Analytics.trackPortfolioView,
    trackPortfolioRefresh: Analytics.trackPortfolioRefresh,
    trackFeatureUsage: Analytics.trackFeatureUsage,
    trackError: Analytics.trackError,
    capture: Analytics.capture,
    getFeatureFlag: Analytics.getFeatureFlag,
    isFeatureEnabled: Analytics.isFeatureEnabled,
  };
};
