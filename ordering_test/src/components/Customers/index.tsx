import { useState, useEffect } from 'react';
import './Customers.css'
import '../Products/Products.css';
import { useGetAllCustomers } from '../../api/getAllCustomers.api';

const Customers = () => {
    const [numberOfItems, setNumberOfItems] = useState<number>(12);
    const [hideLoadMore, setHideLoadMore] = useState<boolean>(false);
    const {data, isFetching} = useGetAllCustomers();
    // check if there is more products in order to show the load more button
    useEffect(() => {        
        if (Array.isArray(data) && data.length <= numberOfItems) {
            setHideLoadMore(true)
        } else {
            setHideLoadMore(false)
        }
    }, [data, numberOfItems])
    // load more function
    const loadMore = () => {
        setNumberOfItems(numberOfItems+6)
    }
    return (
        <div className="customers_container">
            {/* load products */}
            {!isFetching && Array.isArray(data) && data.slice(0, numberOfItems).map((element,i) => {
                return (
                    <div data-testid={`customer_card_${i}`} className="card" key={i}>
                        <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Denim Jeans" style={{width:"100%"}}/>
                        <p className="price">Name: {element.name}</p>
                        <p>Since: {element.since}</p>
                        <p>Revenue: {element.revenue}€</p>
                    </div>
                )
            })}
            {hideLoadMore === false ?
                <button className="load-more-btn" onClick={()=>{loadMore()}}>Load more</button>
                :
                ""
            }
        </div>
    )
}

export default Customers;