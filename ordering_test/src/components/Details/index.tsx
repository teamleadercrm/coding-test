/**
 * This a component, which we can see the details of an order
 * Also we can modify the order and update it
 */
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";
import { useGetOrder } from "../../api/getOrder.api";
import './Details.css'
import '../Products/Products.css';
import { useEffect, useState } from "react";
import { GetOrderTypes } from "../../api/types";
import { decrQuantity, isObjectDiff, incrQuantity, removeItem, addUpdateItem } from "./helpers";
import Products from '../Products';
import { useAddOrder } from '../../api/addOrder.api';

const Details = () => {
    const {state} = useLocation();
    const {id} = state;
    const {data} = useGetOrder(id);
    const {mutateAsync} = useAddOrder();
    const [isItemsVisible, setItemsVisible] = useState<boolean>(false);
    const [dataOrder, setDataOrder] = useState<GetOrderTypes>();
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setDataOrder(data);
    }, [data]);

    const updateOrder = () => {
        mutateAsync(dataOrder)
    }
    
    return (
        <div className="details_container">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customModalStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <Products addCallback={(res) => setDataOrder(addUpdateItem(dataOrder, res))}/>
            </Modal>
            <div data-testid={`order_detail_card`} className="order_card">
                <div className="inner">
                    <div style={{flex:1}}>
                        <p className="card_text">Order Id: {dataOrder?.id}</p>
                        <p className="price">Total price: {dataOrder?.total}</p>
                        <button onClick={() => setIsOpen(true)} className="general_btn">Add new product</button>
                    </div>
                    <div style={{flex:1}}>
                        <p className="card_text">Customer ID: {dataOrder?.["customer-id"]}</p>
                        <p className="card_text">Total items: {dataOrder?.items.length}</p>
                        <button onClick={() => setItemsVisible(true)} className="general_btn">See order's items</button>
                        <p></p>
                        <button 
                            style={{opacity: isObjectDiff(data, dataOrder) ? 1 : 0.5, cursor: !isObjectDiff(data, dataOrder) ? 'block' : 'pointer'}}
                            disabled={!isObjectDiff(data, dataOrder)} 
                            onClick={updateOrder} 
                            className="place_order_btn">
                                Update order
                        </button>


                    </div>
                </div>
            </div>
                {isItemsVisible && 
                    dataOrder?.items.map((item, i) => {
                        return(
                            <div data-testid={`item_details_${i}`} className="card" key={i}>
                                <img src={'https://as2.ftcdn.net/v2/jpg/00/57/93/05/1000_F_57930538_Ytnz8Lk6JnQc1GA1cPfFVJ39o2KBBFUa.jpg'} alt="Denim Jeans" style={{width:"100%"}}/>
                                <h1>{item["product-id"]}</h1>
                                <p className="price">Unit price: {item["unit-price"]}€</p>
                                <div style={{display: 'inline-flex', flexDirection: 'row', alignItems: 'center', width: '40%', justifyContent: 'space-between'}}>
                                    <p>Quantity: {item.quantity}</p>
                                    <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                                        <button onClick={() => setDataOrder(incrQuantity(i, dataOrder))}>↑</button>
                                        <button disabled={parseInt(item.quantity) === 1} onClick={() => setDataOrder(decrQuantity(i, dataOrder))}>↓</button>
                                    </div>
                                </div>
                                <p className="price">Total price: {item.total}€</p>
                                <button className="remove_btn" onClick={() => setDataOrder(removeItem(i, dataOrder))}>Remove item</button>
                            </div>
                        )
                    })
                }
        </div>
   )
}

const customModalStyles = {
    content: {
        top: '20%',
        maxHeight: '700px',
        backgroundColor: '#F6F3F0'
    },
};

export default Details;