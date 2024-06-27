import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/storeContext';

import styles from '../styles/UI.module.css';

const Orders = () => {
  const { customers } = useContext(StoreContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  })

  return (
    <>
      <h3>Customers that have orders:</h3>
      {!isLoading ? (
        <>
          <ul>
            {/*  !!shopOrders = checks if the array is empty or not, if we get just "[]" from api, this will be "true" and might cause unexpected bugs*/}
            {!!customers && customers.map((customer) => (
              <li key={customer.name}>
                <Link className={styles.whiteBg} to={`customer-${customer.id}`} >{customer.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : <h3>Loading users...</h3>}
    </>
  );
};

export default Orders;