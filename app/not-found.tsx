import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-slate-400 mb-6">
        The requested SaaS benchmark cohort or calculator page could not be found.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-indigo-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition"
      >
        Return to Calculator
      </Link>
    </div>
  );
}
