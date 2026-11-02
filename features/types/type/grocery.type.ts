export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ActionType = 
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; item: CartItem }
  | { type: 'CLEAR' };