import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCustomers } from "../../APIs/customer";
import { setStartLoading, setStopLoading } from "./loadingSlice";
import { failed } from "./snackSlice";
import { ICustomer } from "../../models/index.model";
import { AppThunk, AppThunkDispatch } from "..";
import { RootState } from "../rootReducer";

export interface ICustomerState {
  customers: ICustomer[];
  currentCustomer: ICustomer;
}

const initialState: ICustomerState = {
  customers: [],
  currentCustomer: {} as ICustomer,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<ICustomer[]>) => {
      state.customers = action.payload;
    },
    setCurrentCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.currentCustomer = action.payload;
    },
  },
});

export const { setCustomers, setCurrentCustomer } = customerSlice.actions;

// Actions
export const getCustomers =
  (): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setStartLoading());
    try {
      const customers: ICustomer[] = await fetchCustomers();
      dispatch(setCustomers(customers));
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

export const getCustomerFromState =
  (customerId: string) =>
  (dispatch: AppThunkDispatch, getState: () => RootState) => {
    const { customers }: { customers: ICustomer[] } = getState().customer;
    const customer: ICustomer | undefined = customers.find(
      (c: ICustomer) => c.id === customerId
    );
    customer && dispatch(setCurrentCustomer(customer));
  };

// Selectors
export const selectCustomers = (state: RootState) => state.customer.customers;
export const selectCurrentCustomer = (state: RootState): ICustomer =>
  state.customer.currentCustomer;

export default customerSlice.reducer;
