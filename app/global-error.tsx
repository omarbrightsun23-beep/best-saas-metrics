'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white flex min-h-screen items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-slate-400 mb-6">An unexpected application error occurred.</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-indigo-600 hover:bg-emerald-500 rounded text-white font-medium transition cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
