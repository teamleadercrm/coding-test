import React from "react";
import { Grid } from "@mui/material";
import { IOrder } from "../../models/index.model";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: IOrder[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <Grid container spacing={4}>
      {orders?.map((order) => (
        <OrderItem order={order} key={order.id} />
      ))}
    </Grid>
  );
};

export default OrderList;
