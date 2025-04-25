import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-xl font-bold text-gray-900">
              BandayGlam Admin
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin User</span>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Site
            </Link>
            <button className="text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 