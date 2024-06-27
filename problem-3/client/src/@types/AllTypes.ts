import { Dispatch, SetStateAction } from 'react';

/**
 * State types for values and set values
 */
export interface ContextState {
  customers: Customer[];
  orders: Order[];
  products: Products[];
  setCustomers: Dispatch<SetStateAction<Customer[]>>;
  setOrders: Dispatch<SetStateAction<Order[]>>;
  setProducts: Dispatch<SetStateAction<Products[]>>;
}

export type Customer = {
  id: number;
  name: string;
  since: string;
  revenue: number;
};

export type Order = {
  id: number;
  'customer-id': number;
  items: Item[];
  total: number;
};

export type Item = {
  'product-id': string;
  quantity: number;
  'unit-price': number;
  total: number;
};

export type Products = {
  id: string;
  description: string;
  category: number;
  price: number;
};
