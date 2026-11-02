'use client';

import { CartItem as CartItemType } from '@/features/types/type/grocery.type';
import { useGroceryStore } from '@/features/store/useGroceryStore';

export default function CartItemCard({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useGroceryStore();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <span className="text-3xl">{item.image}</span>
        <div>
          <h4 className="font-semibold text-gray-800">{item.name}</h4>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
          >
            -
          </button>
          <span className="px-3 py-1 font-semibold text-sm">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
          >
            +
          </button>
        </div>

        <span className="font-semibold text-gray-900 w-16 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </span>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
}