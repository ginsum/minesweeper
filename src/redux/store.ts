import { configureStore } from "@reduxjs/toolkit";

import revealSlice from "./revealSlice";
import timerSlice from "./timerSlice";

export const store = configureStore({
  reducer: {
    reveal: revealSlice,
    timer: timerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
