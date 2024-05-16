import { createSlice } from "@reduxjs/toolkit";
import { AppThunkDispatch } from "..";
import { RootState } from "../rootReducer";

export interface ILoadingState {
  value: number;
}

const initialState: ILoadingState = {
  value: 0,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setStartLoading: (state) => {
      if (state.value >= 0) return { ...state, value: state.value + 1 };
      return { ...state, value: 1 };
    },
    setStopLoading: (state) => {
      if (state.value > 0) return { ...state, value: state.value - 1 };
      return { ...state, value: 0 };
    },
  },
});

export const { setStartLoading, setStopLoading } = loadingSlice.actions;

// Actions
export const startLoading = () => (dispatch: AppThunkDispatch) => {
  dispatch(setStartLoading());
};

export const stopLoading = () => (dispatch: AppThunkDispatch) => {
  dispatch(setStopLoading());
};

// Selectors
export const selectLoading = (state: RootState) => state.loading.value;

export default loadingSlice.reducer;
