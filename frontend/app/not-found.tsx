import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Simple SVG Illustration */}
      <svg
        className="w-64 h-64 mb-8"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" stroke="#e53e3e" strokeWidth="8" />
        <path
          d="M70 70 L130 130 M130 70 L70 130"
          stroke="#e53e3e"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      {/* Back to Home Button */}
      <Link href="/">
        <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}