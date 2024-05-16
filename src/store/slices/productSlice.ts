import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../../APIs/product";
import { setStartLoading, setStopLoading } from "./loadingSlice";
import { failed } from "./snackSlice";
import { IProduct } from "../../models/index.model";
import { AppThunk, AppThunkDispatch } from ".."; // Import the appropriate types
import { RootState } from "../rootReducer";

export interface IProductState {
  products: IProduct[];
}

const initialState: IProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

// Actions
export const getProducts =
  (): AppThunk => async (dispatch: AppThunkDispatch) => {
    dispatch(setStartLoading());
    try {
      const products: IProduct[] = await fetchProducts();
      dispatch(setProducts(products));
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
export const selectProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;
