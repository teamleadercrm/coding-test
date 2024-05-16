import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";
import snackReducer from "./slices/snackSlice";
import orderReducer from "./slices/orderSlice";

const rootReducer = combineReducers({
  loading: loadingReducer,
  snack: snackReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
