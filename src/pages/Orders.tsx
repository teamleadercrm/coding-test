import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, selectOrders } from "../store/slices/orderSlice";
import { Container } from "@mui/material";
import { IOrder } from "../models/order.model";
import { AppThunkDispatch } from "../store";
import SectionTitle from "../common/SectionTitle";
import OrderList from "../components/OrderList";

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const orders: IOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" component="main" sx={{ pt: 4, pb: 4 }}>
      <SectionTitle variant="h5" title="Your orders List" my={3} />
      <OrderList orders={orders} />
    </Container>
  );
};

export default Orders;
