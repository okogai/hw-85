import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../../typed';
import { fetchTracks } from '../thunks/trackThunk.ts';

interface TrackState {
  tracks: Track[];
  loading: boolean;
}

const initialState: TrackState = {
  tracks: [],
  loading: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
      state.loading = true;
       })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const trackReducer = trackSlice.reducer;
