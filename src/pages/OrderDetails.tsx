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
import ProductList from "../components/product/ProductList";
import {
  getCustomerFromState,
  getCustomers,
  selectCurrentCustomer,
  selectCustomers,
} from "../store/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomerInfo from "../components/customer/CustomerInfo";
import OrderDetailsAction from "../components/order/OrderDetailsAction";
import OrderDetailsList from "../components/order/OrderDetailsList";
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
import PaperWrapper from "../common/PaperWrapper";

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

  const onAddPruduct = useCallback(
    (product: IProduct) => {
      dispatch(addItemToOrder(product));
    },
    [dispatch]
  );

  const onRemoveProduct = useCallback(
    (product: IOrderProductItem) => {
      dispatch(removeItemFromOrder(product));
    },
    [dispatch]
  );

  const orderItems: IOrderProductItem[] | undefined = useMemo(
    () =>
      order?.items?.map((item: IOrderItem) => {
        const product: IProduct | undefined = products.find(
          (product: IProduct) => product.id === item["product-id"]
        );
        return {
          ...item,
          product,
        };
      }),
    [order, products]
  );

  const handlePlaceOrder = useCallback(() => {
    const storedOrders = value;
    const findedOrder = storedOrders.find(
      (item: IOrder) => item?.id === order?.id
    );

    if (!findedOrder) {
      navigate("/order");
      return;
    }

    const itemsLengthChanged =
      order?.items?.length !== findedOrder.items.length;

    const quantityChanged = order?.items?.some(
      (item: IOrderItem, index: number) => {
        const prevItem: IOrderItem = findedOrder.items[index];
        return !prevItem || item?.quantity !== prevItem?.quantity;
      }
    );

    const orderItemsChanged = itemsLengthChanged || quantityChanged;

    if (orderItemsChanged) {
      dispatch(placeOrder());
      navigate("/order");
    }
  }, [dispatch, order, navigate, value]);

  return (
    <Box p={5}>
      <IconButton edge="end" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <SectionTitle title="Order Details" align="center" variant="h5" mb={3} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomerInfo customer={customer} />
        </Grid>

        <Grid item xs={12} md={6}>
          <OrderDetailsAction order={order} onPlace={handlePlaceOrder} />
        </Grid>

        <Grid item xs={12} md={6}>
          <OrderDetailsList
            orderItems={orderItems}
            onRemove={onRemoveProduct}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PaperWrapper>
            <ProductList products={products} onAddProduct={onAddPruduct} />
          </PaperWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;
