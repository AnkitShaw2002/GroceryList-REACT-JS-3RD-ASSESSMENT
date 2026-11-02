'use client';

import { useState } from 'react';
import { useGroceryStore } from '@/features/store/useGroceryStore';

export default function CouponSection() {
  const [inputCode, setInputCode] = useState('');
  const { applyCoupon, removeCoupon, couponCode, couponError } = useGroceryStore();


  const handleApply = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (inputCode) applyCoupon(inputCode);
};

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">🏷️ Coupon Code System</h3>
      {couponCode ? (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
          <div>
            <p className="text-sm font-semibold text-emerald-800">Code applied: {couponCode}</p>
            <p className="text-xs text-emerald-600">Discount active</p>
          </div>
          <button
            onClick={removeCoupon}
            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            placeholder="Try SAVE10 or SUPER20"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Apply
          </button>
        </form>
      )}
      {couponError && <p className="text-xs text-red-500 mt-2">{couponError}</p>}
    </div>
  );
}