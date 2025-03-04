import { configureStore } from "@reduxjs/toolkit";
import { nytApi } from "../services/nytApi";

export const store = configureStore({
  reducer: {
    [nytApi.reducerPath]: nytApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nytApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
