'use client';

import { Product } from '@/features/types/type/grocery.type';
import { useGroceryStore } from '@/features/store/useGroceryStore';

export default function ProductCard({ product }: { product: Product }) {
  const cart = useGroceryStore((state) => state.cart);
  const addToCart = useGroceryStore((state) => state.addToCart);
  const updateQuantity = useGroceryStore((state) => state.updateQuantity);

  // Check if this product exists in the cart and get its current quantity
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="text-5xl mb-3 text-center bg-gray-50 py-6 rounded-lg">
          {product.image}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-800 mt-2 text-lg">{product.name}</h3>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>

        {quantity > 0 ? (
          /* Quantity Stepper Control when item is in cart */
          <div className="flex items-center border border-emerald-500 rounded-lg overflow-hidden bg-emerald-50">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-100 font-bold transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1 font-semibold text-sm text-emerald-900 min-w-[28px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-100 font-bold transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          /* Initial Add to Cart Button */
          <button
            onClick={() => addToCart(product)}
            className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}