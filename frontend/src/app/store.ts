import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../store/slices/artistSlice.ts';
import { albumReducer } from '../store/slices/albumSlice.ts';
import { trackReducer } from '../store/slices/trackSlice.ts';
import { usersReducer } from '../store/slices/userSlice.ts';
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { trackHistoryReducer } from '../store/slices/trackHistorySlice.ts';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistReducer,
  albums: albumReducer,
  tracks: trackReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  trackHistory: trackHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

