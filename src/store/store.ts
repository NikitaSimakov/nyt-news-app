import { configureStore } from "@reduxjs/toolkit";
import { nytApi } from "../services/nytApi";
import newsSlice from "./slices/newsSlice";

export const store = configureStore({
  reducer: {
    [nytApi.reducerPath]: nytApi.reducer,
    news: newsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nytApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
