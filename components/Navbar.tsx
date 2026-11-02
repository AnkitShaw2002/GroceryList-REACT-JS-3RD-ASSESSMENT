'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGroceryStore } from '@/features/store/useGroceryStore';

export default function Navbar() {

const [mounted, setMounted] = useState(false);
  const totalCount = useGroceryStore((state) => state.getTotalCount());
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-600 flex items-center gap-2">
          🛒 FreshMarket
        </Link>
        
        <Link 
          href="/cart" 
          className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
        >
          <span className="text-2xl">🛒</span>
          {mounted && totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}