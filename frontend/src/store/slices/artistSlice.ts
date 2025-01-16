import { createSlice } from "@reduxjs/toolkit";
import { fetchArtists } from '../thunks/artistThunk.ts';
import { Artist } from '../../typed';

interface ArtistState {
  artists: Artist[];
  loading: boolean;
}

const initialState: ArtistState = {
  artists: [],
  loading: false,
};

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
      });
  },
});

export const artistReducer = artistSlice.reducer;
