import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer"; // Import the RootState type

export interface ISnackState {
  text: string;
  variant: "success" | "error" | "info" | "warning" | "default";
}

const initialState: ISnackState = {
  text: "",
  variant: "default",
};

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    setSnack: (_, action: PayloadAction<ISnackState>) => action.payload,
  },
});

export default snackSlice.reducer;

export const { setSnack } = snackSlice.actions;

export const success = (text: string, options?: any) => (dispatch: any) => {
  dispatch(setSnack({ text, variant: "success", ...options }));
};
export const failed = (text: string, options?: any) => (dispatch: any) => {
  dispatch(setSnack({ text, variant: "error", ...options }));
};
export const info = (text: string, options?: any) => (dispatch: any) => {
  dispatch(setSnack({ text, variant: "info", ...options }));
};
export const warning = (text: string, options?: any) => (dispatch: any) => {
  dispatch(setSnack({ text, variant: "warning", ...options }));
};
export const defaultSnack =
  (text: string, options?: any) => (dispatch: any) => {
    dispatch(setSnack({ text, variant: "default", ...options }));
  };

export const selectSnack = (state: RootState) => state.snack;
