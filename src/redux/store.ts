import { configureStore } from "@reduxjs/toolkit";

import revealSlice from "./revealSlice";

export const store = configureStore({
  reducer: {
    reveal: revealSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
