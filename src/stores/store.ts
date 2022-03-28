import { configureStore } from "@reduxjs/toolkit";
import incomeExpense from "./incomeExpense";
// ...

export const store = configureStore({
  reducer: {
    incomeExpense: incomeExpense,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: Com
export type AppDispatch = typeof store.dispatch;
