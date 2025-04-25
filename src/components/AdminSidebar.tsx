'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
      <nav className="mt-5 px-2">
        <Link 
          href="/admin/dashboard" 
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
            isActive('/admin/dashboard') 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          href="/admin/products" 
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
            isActive('/admin/products') 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          Products
        </Link>
        <Link 
          href="/admin/orders" 
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
            isActive('/admin/orders') 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          Orders
        </Link>
        <Link 
          href="/admin/users" 
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
            isActive('/admin/users') 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          Users
        </Link>
      </nav>
    </aside>
  );
} 