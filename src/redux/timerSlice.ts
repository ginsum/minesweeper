import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
  times: number;
  timerActive: boolean;
}

const initialState: TimerState = {
  times: 0,
  timerActive: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    increaseTimes: (state) => {
      state.times += 1;
    },
    setTimesZero: (state) => {
      state.times = 0;
    },
    setTimerActive: (state, action: PayloadAction<boolean>) => {
      state.timerActive = action.payload;
    },
  },
});

export const { increaseTimes, setTimerActive, setTimesZero } =
  timerSlice.actions;

export default timerSlice.reducer;
