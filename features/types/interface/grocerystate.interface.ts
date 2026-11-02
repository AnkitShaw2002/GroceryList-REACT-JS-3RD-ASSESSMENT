
import { Product, CartItem, ActionType } from '@/features/types/type/grocery.type';

export interface GroceryState {
  products: Product[];
  cart: CartItem[];
  history: ActionType[];
  couponCode: string;
  appliedDiscountPercent: number;
  couponError: string;
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  undoLastAction: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  
  // Calculations
  getSubtotal: () => number;
  getThresholdDiscount: () => number;
  getCouponDiscount: () => number;
  getTotalPrice: () => number;
  getTotalCount: () => number;
}