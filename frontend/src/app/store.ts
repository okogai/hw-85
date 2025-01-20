import { configureStore } from "@reduxjs/toolkit";
import { artistReducer } from '../store/slices/artistSlice.ts';
import { albumReducer } from '../store/slices/albumSlice.ts';
import { trackReducer } from '../store/slices/trackSlice.ts';
import { usersReducer } from '../store/slices/userSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumReducer,
    tracks: trackReducer,
    users: usersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
