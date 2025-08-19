'use client';

import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error to Sentry
  Sentry.captureException(error, {
    tags: {
      errorType: 'global',
      location: 'global-error',
    },
    contexts: {
      error: {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      },
    },
  });

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-bg-main text-white">
          <div className="text-center p-8">
            <div className="text-neon-pink text-6xl mb-4">🚨</div>
            <h1 className="text-2xl font-bold mb-4 text-neon-pink">Something went wrong!</h1>
            <p className="text-white/70 mb-6">
              We&apos;ve been notified and are working to fix this issue.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="bg-neon-cyan text-white px-6 py-3 rounded-lg hover:bg-neon-cyan/80 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="bg-neon-pink text-white px-6 py-3 rounded-lg hover:bg-neon-pink/80 transition-colors"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
