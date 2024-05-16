import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders } from "../../APIs/order";
import { setStartLoading, setStopLoading } from "./loadingSlice";
import { failed } from "./snackSlice";
import { IOrder } from "../../models/index.model";
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

// Selectors
export const selectOrders = (state: RootState): IOrder[] => state.order.orders;

export default orderSlice.reducer;
