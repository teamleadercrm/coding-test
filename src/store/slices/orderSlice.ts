import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrder, fetchOrders } from "../../APIs/order";
import { setStartLoading, setStopLoading } from "./loadingSlice";
import { failed, success } from "./snackSlice";
import {
  IOrder,
  IOrderItem,
  IOrderProductItem,
  IProduct,
} from "../../models/index.model";
import { AppThunk, AppThunkDispatch } from "..";
import { RootState } from "../rootReducer";

export interface IOrderState {
  orders: IOrder[];
  order: IOrder;
}

const initialState: IOrderState = {
  orders: [],
  order: {} as IOrder,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    setOrder: (state, action: PayloadAction<IOrder>) => {
      state.order = action.payload;
    },
  },
});

export const { setOrders, setOrder } = orderSlice.actions;

// Actions
export const getOrders = (): AppThunk => async (dispatch: AppThunkDispatch) => {
  dispatch(setStartLoading());
  try {
    const storedOrdersString = localStorage.getItem("orders");
    const storedOrders: IOrder[] = storedOrdersString
      ? JSON.parse(storedOrdersString)
      : [];

    const orders: IOrder[] = await fetchOrders();

    if (storedOrders.length === 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
      dispatch(setOrders(orders));
    } else {
      dispatch(setOrders(storedOrders));
    }

    dispatch(setStopLoading());
  } catch (err: any) {
    dispatch(setStopLoading());
    const errorMessage: string =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "";
    dispatch(failed(errorMessage));
    console.error(err);
  }
};

export const getOrder =
  (orderId: string | undefined): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: () => RootState) => {
    dispatch(setStartLoading());
    try {
      const {
        order: { orders },
      } = getState();
      const storedOrdersString = localStorage.getItem("orders");
      const storedOrders: IOrder[] = storedOrdersString
        ? JSON.parse(storedOrdersString)
        : [];
      let order: IOrder | undefined;

      if (storedOrders.length > 0) {
        order =
          storedOrders.find((order) => order.id === orderId) ||
          orders.find((order) => order.id === orderId);
      } else {
        order = await fetchOrder(orderId);
      }

      if (order) {
        dispatch(setOrder(order));
      }
      dispatch(setStopLoading());
    } catch (err: any) {
      dispatch(setStopLoading());
      const errorMessage: string =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "";
      dispatch(failed(errorMessage));
      console.error(err);
    }
  };

export const addItemToOrder =
  (product: IProduct) =>
  (dispatch: AppThunkDispatch, getState: () => RootState) => {
    try {
      const { order }: IOrderState = getState().order;
      const updatedItems: IOrderItem[] = [...(order?.items || [])];
      const itemIndex = order?.items?.findIndex(
        (item: IOrderItem) => item["product-id"] === product?.id
      );

      if (itemIndex !== undefined && itemIndex !== -1) {
        const item: IOrderItem = updatedItems[itemIndex];
        const updatedQuantity = parseInt(item.quantity ?? "0") + 1;
        const updatedItem: IOrderItem = {
          ...item,
          quantity: updatedQuantity.toString(),
          total: (
            parseFloat(item["unit-price"] ?? "0") * updatedQuantity
          ).toFixed(2),
        };

        updatedItems[itemIndex] = updatedItem;
      } else {
        updatedItems.push({
          "product-id": product?.id,
          quantity: "1",
          "unit-price": product.price?.toString(),
          total: product.price?.toString(),
        });
      }

      const total = updatedItems.reduce(
        (total, item) => total + parseFloat(item.total ?? "0"),
        0
      );

      const updatedOrder: IOrder = {
        ...order,
        items: updatedItems,
        total: total.toFixed(2),
      };

      dispatch(setOrder(updatedOrder));
    } catch (err) {
      console.error(err);
    }
  };

export const removeItemFromOrder =
  (productItem: IOrderProductItem) =>
  (dispatch: AppThunkDispatch, getState: () => RootState) => {
    try {
      const { order }: { order: IOrder } = getState().order;
      const updatedItems: IOrderItem[] = [...(order?.items || [])];
      const itemIndex = order?.items?.findIndex(
        (item: IOrderItem) =>
          item?.["product-id"] === productItem?.["product-id"]
      );

      if (itemIndex !== undefined && itemIndex !== -1) {
        const item = updatedItems[itemIndex];
        if (parseInt(item.quantity ?? "0") > 1) {
          const updatedItem: IOrderItem = {
            ...item,
            quantity: (parseInt(item.quantity ?? "0") - 1).toString(),
            total: (
              parseFloat(item["unit-price"] ?? "0") *
              (parseInt(item.quantity ?? "0") - 1)
            ).toFixed(2),
          };
          updatedItems[itemIndex] = updatedItem;
        } else {
          updatedItems.splice(itemIndex, 1);
        }
      }

      const updatedOrder: IOrder = {
        ...order,
        items: updatedItems,
        total: updatedItems
          .reduce((total, item) => total + parseFloat(item.total ?? "0"), 0)
          .toFixed(2),
      };

      dispatch(setOrder(updatedOrder));
    } catch (err) {
      console.error(err);
    }
  };

export const placeOrder =
  (): AppThunk => (dispatch: AppThunkDispatch, getState: () => RootState) => {
    try {
      const { order, orders }: { order: IOrder; orders: IOrder[] } =
        getState().order;

      dispatch(setOrder(order));

      const updatedOrders = [...orders];
      const findedOrderIndex = updatedOrders.findIndex(
        (o) => o.id === order.id
      );
      if (findedOrderIndex !== -1) {
        updatedOrders[findedOrderIndex] = order;
      } else {
        updatedOrders.push(order);
      }

      dispatch(success("Order placed successfully!"));
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      console.log(updatedOrders);
    } catch (err) {
      console.error(err);
    }
  };

// Selectors
export const selectOrders = (state: RootState): IOrder[] => state.order.orders;
export const selectOrder = (state: RootState): IOrder => state.order.order;

export default orderSlice.reducer;
