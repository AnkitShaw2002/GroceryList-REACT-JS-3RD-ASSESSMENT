"use client";

import { useGroceryStore } from '@/features/store/useGroceryStore';
import CartItemCard from '@/components/CartItem';
import CouponSection from '@/components/CouponSection';
import CartSummary from '@/components/CartSummary';

export default function CartPage() {
  const { cart, history, undoLastAction, getSubtotal } = useGroceryStore();
  
  const subtotal = getSubtotal();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Discounts, Coupons, Cart Items & Undo */}
          <div className="lg:col-span-2">
            {/*Discount Info Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-6">
              <h3 className="font-semibold text-emerald-900">Threshold Discounts</h3>
              <ul className="text-xs text-emerald-700 mt-1 list-disc list-inside">
                <li>Spend $50+ to get 10% off entire order</li>
                <li>Spend $100+ to get 15% off entire order</li>
              </ul>
              <div className="mt-2 text-xs font-semibold text-emerald-800">
                {subtotal < 50 && `Add $${(50 - subtotal).toFixed(2)} more to unlock 10% discount!`}
                {subtotal >= 50 && subtotal < 100 && `Add $${(100 - subtotal).toFixed(2)} more to unlock 15% discount!`}
                {subtotal >= 100 && `Maximum threshold discount unlocked (15% OFF)!`}
              </div>
            </div>

            {/* Coupon Code Section */}
            <CouponSection />


            {/* Undo Last Action Section (Placed below cart) */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800 text-sm">Undo Last Action</h4>
                <p className="text-xs text-gray-500">Revert the last item addition or deletion.</p>
              </div>
              <button
                onClick={undoLastAction}
                disabled={history.length === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  history.length > 0
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                ↩️ Undo Action
              </button>
            </div>


            {/* Cart Items List */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-800 border-b pb-3 mb-2">Cart Items</h3>
              {cart.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            
          </div>

          {/* Right Side: Cart Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </main>
  );
}