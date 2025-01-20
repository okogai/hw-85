import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { RootState } from '../../app/store.ts';
import { TrackHistory } from '../../typed';

export const addTrackToHistory = createAsyncThunk<void, string, {state: RootState}>(
  'trackHistory/addTrackToHistory',
  async (trackId: string, {getState}) => {
    const token = getState().users.user?.token;
    const response = await axiosAPI.post(`track_history`, {track: trackId}, {headers: {'Authorization': token}});
    return response.data;
  }
);

export const getTrackToHistory = createAsyncThunk<TrackHistory[], void, {state: RootState}>(
  'trackHistory/getTrackToHistory',
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    const response = await axiosAPI.get(`track_history`, {headers: {'Authorization': token}});
    return response.data;
  }
);