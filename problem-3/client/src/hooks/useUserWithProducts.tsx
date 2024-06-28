import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Customer, Item } from '../@types/AllTypes';
import { StoreContext } from '../store/storeContext';

const useUserWithProducts = (): [Customer | undefined, Item[] | undefined] => {
  const [customer, setCustomer] = useState<Customer>();
  const [customerProducts, setCustomerProducts] = useState<Item[] | undefined>();
  const { customerDetails } = useParams(); // Get customer name from URL

  const { orders, customers } = useContext(StoreContext)

  useEffect(() => {
    const customerId = customerDetails?.split('-')[1];
    const getCustomer = customers.filter((cus) => cus.id === parseInt(customerId as string))[0]
    setCustomer(getCustomer)
  }, [customerDetails, customers]) // If customerDetails or customers changes, this effect will be called and get the new data

  // Set active customer products
  useEffect(() => {
    const getCustomerOrders = orders.filter(ord => ord['customer-id'] === customer?.id)[0]?.items;
    setCustomerProducts(getCustomerOrders);
  }, [customer, orders])

  return [customer, customerProducts]
}

export default useUserWithProducts;