/**
 * This is a dummy component to display all the Orders
 * By clicking on any order, iser navigates to the specific order
 */
import { useGetAllOrders } from "../../api/getAllOrders.api";
import { useNavigate } from "react-router-dom";
import './Orders.css'

const Orders = () => {
    const navigate = useNavigate();
    const {data: allOrders, isFetching} = useGetAllOrders();

    const onPress = (value: number) => {
        navigate("/details", {state: {id: value.toString()}})
    }
    
    return (
        <div className="orders_container">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>My Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {!isFetching && Array.isArray(allOrders) && allOrders.map((item, i: number) => {
                        const id = parseInt(item.replace(/^\D+/g, ''));
                        return (
                            <tr data-testid={`order_id_${i}`} style={{cursor: 'pointer'}} onClick={() => onPress(id)} key={i}>
                                <td>{i+1}</td>
                                <td>{`Order ${i+1}`}</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}

export default Orders;