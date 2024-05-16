import {
  Action,
  ThunkAction,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<RootState, undefined, Action>;
