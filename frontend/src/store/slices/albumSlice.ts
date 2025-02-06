import { createSlice } from "@reduxjs/toolkit";
import { Album, GlobalError } from "../../typed";
import {
  addAlbum,
  deleteAlbum,
  fetchAlbums,
  publishAlbum,
} from "../thunks/albumThunk.ts";
import { RootState } from "../../app/store.ts";

interface AlbumState {
  albums: Album[];
  currentAlbum: Album | null;
  loading: boolean;
  error: GlobalError | null;
}

const initialState: AlbumState = {
  albums: [],
  currentAlbum: null,
  loading: false,
  error: null,
};

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.loading;
export const selectAlbumsError = (state: RootState) => state.albums.error;

const albumSlice = createSlice({
  name: "albums",
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
      })
      .addCase(deleteAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAlbum.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })
      .addCase(addAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAlbum.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addAlbum.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })
      .addCase(publishAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishAlbum.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishAlbum.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentAlbum } = albumSlice.actions;
export const albumReducer = albumSlice.reducer;
