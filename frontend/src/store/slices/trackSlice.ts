import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, Track } from '../../typed';
import { addTrack, deleteTrack, fetchTracks, publishTrack } from '../thunks/trackThunk.ts';
import { RootState } from '../../app/store.ts';

interface TrackState {
  tracks: Track[];
  loading: boolean;
  error: GlobalError | null;
}

const initialState: TrackState = {
  tracks: [],
  loading: false,
  error: null
};

export const selectTracks= (state: RootState) => state.tracks.tracks;
export const selectTracksLoading= (state: RootState) => state.tracks.loading;

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
      })
      .addCase(deleteTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTrack.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })
      .addCase(addTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrack.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTrack.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })
      .addCase(publishTrack.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishTrack.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishTrack.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const trackReducer = trackSlice.reducer;
