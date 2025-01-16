import { configureStore } from "@reduxjs/toolkit";
import { artistReducer } from '../store/slices/artistSlice.ts';
import { albumReducer } from '../store/slices/albumSlice.ts';
import { trackReducer } from '../store/slices/trackSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumReducer,
    tracks: trackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
