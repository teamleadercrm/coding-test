import { useContext } from 'react';
import { StoreContext } from '../store/storeContext';
import styles from '../styles/UI.module.css';
import { Customer, Item, } from '../@types/AllTypes';
import { ToastContainer, toast } from 'react-toastify';

type CustomerProps = {
  customer: Customer;
}

const Products = ({ customer }: CustomerProps) => {
  const { products, setOrders } = useContext(StoreContext)
  const notify = () => toast.success('New item added!');


  const handleAddNewItem = (newItem: Item) => {
    setOrders(prevOrders => {
      const matchingOrder = prevOrders.find(order => order['customer-id'] === customer?.id);
      if (matchingOrder) {
        const existingItemIndex = matchingOrder.items.findIndex(item => item['product-id'] === newItem['product-id']);
        if (existingItemIndex !== -1) {
          // Update quantity of existing item
          const updatedItems = [...matchingOrder.items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          updatedItems[existingItemIndex].total += newItem['unit-price'];
          return prevOrders.map(order =>
            order.id === matchingOrder.id
              ? { ...order, items: updatedItems, total: updatedItems.reduce((acc, item) => acc + (item.quantity * item['unit-price']), 0) }
              : order
          );
        } else {
          // Add new item if product-id doesn't exist
          notify();
          return prevOrders.map(order =>
            order.id === matchingOrder.id
              ? { ...order, items: [...order.items, newItem], total: order.total + (newItem.quantity * newItem['unit-price']) }
              : order
          );
        }
      } else {
        // Create a new order if customer doesn't have one yet
        return [...prevOrders, { 'customer-id': customer?.id, items: [newItem], total: newItem.quantity * newItem['unit-price'] }];
      }
    });
  };

  return (
    <div className={styles['add-more-items']}>
      <ToastContainer />
      <p>Add more products to your orders:</p>
      <ul>
        {!!products && products.map(prod => (
          <li className={styles.whiteBg} key={prod.description}>
            <p>{prod.description}</p>
            <p>price {prod.price}</p>
            <button onClick={() => handleAddNewItem({ 'product-id': prod.id, quantity: 1, 'unit-price': prod.price, total: prod.price })}>Add</button>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Products;