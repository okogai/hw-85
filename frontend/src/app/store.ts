import { configureStore } from "@reduxjs/toolkit";
import { artistReducer } from '../store/slices/artistSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
