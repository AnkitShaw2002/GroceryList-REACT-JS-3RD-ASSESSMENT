import { Product } from '@/features/types/type/grocery.type';

const now = Date.now();


// Here unique id is provide for with help of date
export const INITIAL_PRODUCTS: Product[] = [
  { id: `${now}-1`, name: 'Fresh Organic Apples', price: 19, category: 'Fruits', image: '🍎' },
  { id: `${now}-2`, name: 'Bananas (Bunch)', price: 12, category: 'Fruits', image: '🍌' },
  { id: `${now}-3`, name: 'Whole Milk (1L)', price: 8, category: 'Dairy', image: '🥛' },
  { id: `${now}-4`, name: 'Cheddar Cheese', price: 25, category: 'Dairy', image: '🧀' },
  { id: `${now}-5`, name: 'Fresh Spinach', price: 15, category: 'Vegetables', image: '🥬' },
  { id: `${now}-6`, name: 'Carrots (1kg)', price: 10, category: 'Vegetables', image: '🥕' },
  { id: `${now}-7`, name: 'Whole Wheat Bread', price: 14, category: 'Bakery', image: '🍞' },
  { id: `${now}-8`, name: 'Avocado', price: 30, category: 'Fruits', image: '🥑' },
];

//Coupon code with off percentage
export const VALID_COUPONS: Record<string, number> = {
  'SAVE10': 10, // 10% off
  'SUPER20': 20, // 20% off
};