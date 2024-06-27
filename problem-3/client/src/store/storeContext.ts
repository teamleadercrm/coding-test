import React from 'react';
import type { ContextState } from '../@types/AllTypes';

export const StoreContext = React.createContext<ContextState>({
  customers: [],
  orders: [],
  products: [],
  setCustomers: () => [],
  setOrders: () => [],
  setProducts: () => [],
});
