import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Item, Customer } from '../@types/AllTypes';
import { StoreContext } from '../store/storeContext';
import Products from './Products';
import styles from '../styles/UI.module.css';
import { ToastContainer, toast } from 'react-toastify';

const CustomerDetails = () => {
  const { orders, customers, products, setOrders } = useContext(StoreContext)

  const [customer, setCustomer] = useState<Customer>();
  const [customerProducts, setCustomerProducts] = useState<Item[] | undefined>();
  const { customerDetails } = useParams(); // Get customer name from URL
  const notify = () => toast.warning('Item removed!');

  const totalCustomerAmount = customerProducts?.reduce((acc, val) => acc + val.total, 0)

  // Set active customer 
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

  /**
   * 
   * @param product user selected product 
   * @param qauntityType 'add' | 'remove' 
   * @returns updated quantity for orders
   */
  const handleQuantity = (product: Item, qauntityType: 'add' | 'remove', quantity: number) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order['customer-id'] !== customer?.id) {
          return order;
        }

        // Notify when item is removed
        quantity === 1 && notify();

        const updatedItems = order.items.map(item => {
          if (item['product-id'] === product['product-id']) {
            return qauntityType === 'remove' && item.quantity === 0
              ? item // Keep the item with quantity 1
              : {
                ...item,
                quantity: qauntityType === 'add' ? item.quantity + 1 : item.quantity - 1,
                total: qauntityType === 'add' ? (item.quantity + 1) * item['unit-price'] : (item.quantity - 1) * item['unit-price'],
              };
          }
          return item;
        });

        const filteredItems = updatedItems.filter(item => item.quantity !== 0);

        return {
          ...order,
          items: filteredItems,
          total: filteredItems.reduce((acc, item) => acc + (item.quantity * item['unit-price']), 0),
        };
      })
    );
  };

  /**
   * 
   * @param prodId product id
   * @returns product name 
   */
  const getProductInfo = (prodId: string) => products.filter(pd => pd.id === prodId)[0].description

  return (
    <div className={styles.customerDetailsContainer}>
      <ToastContainer />
      <div>
        <Link to={'/orders'}>Go back</Link>
        <h3>Customer:  {customer?.name} has a total revenue of: {customer?.revenue}</h3>
        <h3>Total amount: <code>{parseFloat(`${totalCustomerAmount}`).toFixed(2)}$</code></h3>

        <br />
        <p>In shopping cart:</p>
        <ul>
          {!!customerProducts && customerProducts.map(product => (
            <li className={styles.whiteBg} key={product['product-id']}>
              <p>Item: <strong>{getProductInfo(product['product-id'])}</strong></p>
              <p>Quantity: {product?.quantity}</p>
              <p>Unit Price: {product?.['unit-price']},</p>
              <p>Total amount: {product?.total}$</p>
              <button onClick={() => handleQuantity(product, 'add', product.quantity)}>Add quantity</button>
              <button onClick={() => handleQuantity(product, 'remove', product.quantity)}>Remove quantity</button>
            </li>
          ))}
        </ul>
      </div>
      <Products customer={customer as Customer} />
    </div>
  );
};

export default CustomerDetails;