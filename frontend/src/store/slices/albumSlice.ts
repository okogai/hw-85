import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../typed';
import { fetchAlbums } from '../thunks/albumThunk.ts';

interface AlbumState {
  albums: Album[];
  currentAlbum: Album | null;
  loading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  currentAlbum: null,
  loading: false,
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setCurrentAlbum: (state, action) => {
      state.currentAlbum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentAlbum } = albumSlice.actions;
export const albumReducer = albumSlice.reducer;
