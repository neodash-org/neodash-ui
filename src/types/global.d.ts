// Global type declarations for NeoDash UI

declare global {
  interface Window {
    posthog: {
      capture: (...args: unknown[]) => void;
      identify: (...args: unknown[]) => void;
      getFeatureFlag: (key: string) => boolean;
      isFeatureEnabled: (key: string) => boolean;
      _captured: unknown[];
      _capturedMessages?: unknown[];
      _capturedExceptions?: unknown[];
    };
    Sentry: {
      captureException: (...args: unknown[]) => void;
      captureMessage: (...args: unknown[]) => void;
      setUser: (...args: unknown[]) => void;
      addBreadcrumb: (...args: unknown[]) => void;
      _capturedMessages?: unknown[];
      _capturedExceptions?: unknown[];
    };
  }
}

export {};
