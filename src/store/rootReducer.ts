import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";
import snackReducer from "./slices/snackSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import customerReducer from "./slices/customerSlice";

const rootReducer = combineReducers({
  loading: loadingReducer,
  snack: snackReducer,
  order: orderReducer,
  product: productReducer,
  customer: customerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
