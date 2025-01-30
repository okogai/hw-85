import { createSlice } from "@reduxjs/toolkit";
import { addArtist, deleteArtist, fetchArtists, publishArtist } from '../thunks/artistThunk.ts';
import { Artist, GlobalError } from '../../typed';
import { RootState } from '../../app/store.ts';

interface ArtistState {
  artists: Artist[];
  loading: boolean;
  error: GlobalError | null;
}

const initialState: ArtistState = {
  artists: [],
  loading: false,
  error: null
};

export const selectArtists= (state: RootState) => state.artists.artists;
export const selectArtistsLoading= (state: RootState) => state.artists.loading;
export const selectArtistsError= (state: RootState) => state.artists.error;

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.loading = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteArtist.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })
      .addCase(addArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addArtist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addArtist.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })
      .addCase(publishArtist.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishArtist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishArtist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const artistReducer = artistSlice.reducer;
