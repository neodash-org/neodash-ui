import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';

export default function NotFound() {
  // Log 404 error to Sentry
  Sentry.captureMessage('Page not found (404)', {
    level: 'warning',
    tags: {
      errorType: 'not-found',
      location: '404-page',
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-main text-white">
      <div className="text-center p-8">
        <div className="text-neon-pink text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-4 text-neon-pink">Page Not Found</h1>
        <p className="text-white/70 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="bg-neon-cyan text-white px-6 py-3 rounded-lg hover:bg-neon-cyan/80 transition-colors inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
