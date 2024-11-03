import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlice";
import statusSlice from "./statusSlice";
import timerSlice from "./timerSlice";

export const store = configureStore({
  reducer: {
    board: boardSlice,
    timer: timerSlice,
    status: statusSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
