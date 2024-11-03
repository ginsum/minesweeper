import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StatusState {
  success: boolean;
  fail: boolean;
}

const initialState: StatusState = {
  success: false,
  fail: false,
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setFail: (state, action: PayloadAction<boolean>) => {
      state.fail = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    resetStatus: (state) => {
      state.fail = false;
      state.success = false;
    },
  },
});

export const { setFail, setSuccess, resetStatus } = statusSlice.actions;

export default statusSlice.reducer;
