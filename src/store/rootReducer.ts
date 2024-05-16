import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";
import snackReducer from "./slices/snackSlice";

const rootReducer = combineReducers({
  loading: loadingReducer,
  snack: snackReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
