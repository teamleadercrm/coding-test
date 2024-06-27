import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import { StoreContext } from './store/storeContext'

import Dashboard from './components/Dashboard'
import Orders from './components/Orders';
import CustomerDetails from './components/CustomerDetails';

import type { ContextState } from './@types/AllTypes'

import { orders as dbInitOrders } from './db/orders'
import { products as dbInitProducts } from './db/products'
import { customers as dbInitCustomers } from './db/customers'

const App = () => {
  const [customers, setCustomers] = useState(dbInitCustomers);
  const [orders, setOrders] = useState(dbInitOrders);
  const [products, setProducts] = useState(dbInitProducts);

  const storeValue: ContextState = {
    customers,
    orders,
    products,
    setCustomers,
    setOrders,
    setProducts,
  }

  return (
    <StoreContext.Provider value={storeValue}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/:customerDetails' element={<CustomerDetails />} />
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  )
}

export default App
