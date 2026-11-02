'use client';

import { useGroceryStore } from '@/features/store/useGroceryStore';

export default function CartSummary() {
  const getSubtotal = useGroceryStore((state) => state.getSubtotal);
  const getThresholdDiscount = useGroceryStore((state) => state.getThresholdDiscount);
  const getCouponDiscount = useGroceryStore((state) => state.getCouponDiscount);
  const getTotalPrice = useGroceryStore((state) => state.getTotalPrice);
  const appliedDiscountPercent = useGroceryStore((state) => state.appliedDiscountPercent);

  const subtotal = getSubtotal();
  const thresholdDiscount = getThresholdDiscount();
  const couponDiscount = getCouponDiscount();
  const total = getTotalPrice();

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {thresholdDiscount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Threshold Discount</span>
            <span>-${thresholdDiscount.toFixed(2)}</span>
          </div>
        )}

        {couponDiscount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Coupon Discount ({appliedDiscountPercent}%)</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
          <span>Total Price</span>
          <span className="text-emerald-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}