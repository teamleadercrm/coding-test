import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrder,
  selectOrder,
  addItemToOrder,
  removeItemFromOrder,
  placeOrder,
} from "../store/slices/orderSlice";
import { Grid, IconButton, Box } from "@mui/material";
import { getProducts, selectProducts } from "../store/slices/productSlice";
import {
  getCustomerFromState,
  getCustomers,
  selectCurrentCustomer,
  selectCustomers,
} from "../store/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppThunkDispatch } from "../store";
import {
  ICustomer,
  IOrder,
  IOrderItem,
  IOrderProductItem,
  IProduct,
} from "../models/index.model";
import SectionTitle from "../common/SectionTitle";
import CustomerInfo from "../components/customer/CustomerInfo";

interface StoredOrder {
  id: string;
  items: IOrderItem[];
}

const OrderDetails: React.FC = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const order: IOrder = useSelector(selectOrder);
  const { orderId } = useParams<string>();
  const products = useSelector(selectProducts);
  const customers = useSelector(selectCustomers);
  const customer: ICustomer = useSelector(selectCurrentCustomer);
  const navigate = useNavigate();
  const [value] = useLocalStorage<StoredOrder[]>("orders", []);

  useEffect(() => {
    dispatch(getOrder(orderId));
    dispatch(getProducts());
    dispatch(getCustomers());
  }, [orderId, dispatch, value]);

  useEffect(() => {
    if (order["customer-id"] && customers.length > 0) {
      dispatch(getCustomerFromState(order["customer-id"]));
    }
  }, [order, customers, dispatch]);

  return (
    <Box p={5}>
      <IconButton edge="end" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <SectionTitle title="Order Details" align="center" variant="h5" mb={3} />
      <Grid item xs={12} md={6}>
        <CustomerInfo customer={customer} />
      </Grid>

      <Grid container spacing={2}></Grid>
    </Box>
  );
};

export default OrderDetails;
