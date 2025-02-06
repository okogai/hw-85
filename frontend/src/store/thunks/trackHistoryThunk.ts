import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { TrackHistory } from "../../typed";

export const addTrackToHistory = createAsyncThunk<void, string>(
  "trackHistory/addTrackToHistory",
  async (trackId: string) => {
    const response = await axiosAPI.post(`track_history`, { track: trackId });
    return response.data;
  },
);

export const getTrackToHistory = createAsyncThunk<TrackHistory[], void>(
  "trackHistory/getTrackToHistory",
  async () => {
    const response = await axiosAPI.get(`track_history`);
    return response.data;
  },
);
