import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/features/types/type/grocery.type';
import { INITIAL_PRODUCTS, VALID_COUPONS } from '@/features/helper/data/staticProduct';
import {GroceryState} from '@/features/types/interface/grocerystate.interface'


export const useGroceryStore = create<GroceryState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      cart: [],
      history: [],
      couponCode: '',
      appliedDiscountPercent: 0,
      couponError: '',

      addToCart: (product) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex((item) => item.id === product.id);
        let updatedCart: CartItem[];
        let addedItem: CartItem;

        if (existingIndex > -1) {
          updatedCart = currentCart.map((item, index) =>
            index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
          );
          addedItem = { ...product, quantity: 1 };
        } else {
          addedItem = { ...product, quantity: 1 };
          updatedCart = [...currentCart, addedItem];
        }

        set((state) => ({
          cart: updatedCart,
          history: [...state.history, { type: 'ADD', item: addedItem }],
        }));
      },

      removeFromCart: (id) => {
        const currentCart = get().cart;
        const itemToRemove = currentCart.find((item) => item.id === id);

        if (!itemToRemove) return;

        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
          history: [...state.history, { type: 'REMOVE', item: itemToRemove }],
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },

      undoLastAction: () => {
        const history = get().history;
        if (history.length === 0) return;

        const lastAction = history[history.length - 1];
        const newHistory = history.slice(0, -1);

        if (lastAction.type === 'ADD') {
          const currentCart = get().cart;
          const target = currentCart.find((item) => item.id === lastAction.item.id);
          
          if (target && target.quantity > 1) {
            set({
              cart: currentCart.map((item) =>
                item.id === target.id ? { ...item, quantity: item.quantity - 1 } : item
              ),
              history: newHistory,
            });
          } else {
            set({
              cart: currentCart.filter((item) => item.id !== lastAction.item.id),
              history: newHistory,
            });
          }
        } else if (lastAction.type === 'REMOVE') {
          set((state) => ({
            cart: [...state.cart, lastAction.item],
            history: newHistory,
          }));
        }
      },

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (VALID_COUPONS[cleanCode]) {
          set({
            couponCode: cleanCode,
            appliedDiscountPercent: VALID_COUPONS[cleanCode],
            couponError: '',
          });
        } else {
          set({ couponError: 'Invalid Coupon Code' });
        }
      },

      removeCoupon: () => {
        set({ couponCode: '', appliedDiscountPercent: 0, couponError: '' });
      },

      getSubtotal: () => {
        return get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      // Threshold discount: 15% off if subtotal > 100, 10% off if subtotal > 50
      getThresholdDiscount: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= 100) return subtotal * 0.15;
        if (subtotal >= 50) return subtotal * 0.10;
        return 0;
      },

      getCouponDiscount: () => {
        const subtotal = get().getSubtotal();
        const percent = get().appliedDiscountPercent;
        return (subtotal * percent) / 100;
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal();
        const thresholdDisc = get().getThresholdDiscount();
        const couponDisc = get().getCouponDiscount();
        const total = subtotal - thresholdDisc - couponDisc;
        return total > 0 ? total : 0;
      },

      getTotalCount: () => {
        return get().cart.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'grocery-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        history: state.history,
        couponCode: state.couponCode,
        appliedDiscountPercent: state.appliedDiscountPercent,
      }),
    }
  )
);