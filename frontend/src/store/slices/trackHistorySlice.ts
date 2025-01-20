import { createSlice } from '@reduxjs/toolkit';
import { addTrackToHistory, getTrackToHistory } from '../thunks/trackHistoryThunk.ts';
import { TrackHistory } from '../../typed';
import { RootState } from '../../app/store.ts';

interface TrackState {
  tracksHistory: TrackHistory[];
  addTrackHistoryLoading: boolean;
  getTrackHistoryLoading: boolean;
}

const initialState: TrackState = {
  tracksHistory: [],
  addTrackHistoryLoading: false,
  getTrackHistoryLoading: false,
};

export const selectTrackHistory = (state: RootState) => state.trackHistory.tracksHistory;
export const selectAddTrackHistoryLoading = (state: RootState) => state.trackHistory.addTrackHistoryLoading;
export const selectGetTrackHistoryLoading = (state: RootState) => state.trackHistory.getTrackHistoryLoading;

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackToHistory.pending, (state) => {
        state.addTrackHistoryLoading = true;
      })
      .addCase(addTrackToHistory.fulfilled, (state) => {
        state.addTrackHistoryLoading = false;
      })
      .addCase(addTrackToHistory.rejected, (state) => {
        state.addTrackHistoryLoading = false;
      })
      .addCase(getTrackToHistory.pending, (state) => {
        state.getTrackHistoryLoading = true;
      })
      .addCase(getTrackToHistory.fulfilled, (state, action) => {
        state.getTrackHistoryLoading = false;
        state.tracksHistory = action.payload;
      })
      .addCase(getTrackToHistory.rejected, (state) => {
        state.getTrackHistoryLoading = false;
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
