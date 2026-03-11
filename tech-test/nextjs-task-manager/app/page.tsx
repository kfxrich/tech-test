export default function TaskManagerPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <header className="p-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">📋 Task Manager</h1>
            <p className="text-gray-600">Test 7: Next.js - Full-stack React framework</p>
          </header>

          {/* Loading State */}
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Setting up Next.js with Tailwind CSS...</p>
            <p className="text-sm text-gray-500 mt-2">
              Next.js 14 + Tailwind CSS configuration requires proper setup.
              <br />
              This demo shows the file structure and configuration patterns.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
          from {
            transform: rotate(0deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
