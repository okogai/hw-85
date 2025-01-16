import { configureStore } from "@reduxjs/toolkit";
import { artistReducer } from '../store/slices/artistSlice.ts';
import { albumReducer } from '../store/slices/albumSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
