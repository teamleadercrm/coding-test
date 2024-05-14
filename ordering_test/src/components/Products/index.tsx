import { useState, useEffect, FC } from 'react'
import { toast } from 'react-toastify';
import './Products.css'
import { OwnProps, ProductsTypes } from './types';
import { useGetAllProducts } from '../../api/getAllProducts.api';

const Products:FC<OwnProps> = props => {
    const [numberOfItems, setNumberOfItems] = useState<number>(12);
    const [hideLoadMore, setHideLoadMore] = useState<boolean>(false);
    const {data, isFetching} = useGetAllProducts();
    // check if there is more products in order to show the load more button
    useEffect(() => {        
        if (!isFetching && Array.isArray(data) && data?.length <= numberOfItems) {
            setHideLoadMore(true)
        } else {
            setHideLoadMore(false)
        }
    }, [data, numberOfItems])
    // load more function
    const loadMore = () => {
        setNumberOfItems(numberOfItems+6)
    }

    const add = (item: ProductsTypes) => {
        props.addCallback(item)
        toast.success('Product added successfully')
    }
    return (
        <div className="products_container">
            {/* load products */}
            {!isFetching && Array.isArray(data) && data.slice(0, numberOfItems).map((element,i) => {
                return (
                    <div data-testid={`${i}_product_id`} className="card" key={i}>
                        <img src={'https://as2.ftcdn.net/v2/jpg/00/57/93/05/1000_F_57930538_Ytnz8Lk6JnQc1GA1cPfFVJ39o2KBBFUa.jpg'} alt="Denim Jeans" style={{width:"100%"}}/>
                        <h1>{element.id}</h1>
                        <p className="price">Price: {element.price}€</p>
                        <p>{element.description}</p>
                            <button onClick={()=>{add(element)}} className="btn">Add to order</button>
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

export default Products;